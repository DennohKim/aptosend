use crate::db::common::models::events_models::EventModel;
use anyhow::Result;
use aptos_indexer_processor_sdk::{
    aptos_protos::transaction::v1::{transaction::TxnData, Transaction},
    traits::{async_step::AsyncRunType, AsyncStep, NamedStep, Processable},
    types::transaction_context::TransactionContext,
    utils::errors::ProcessorError,
};
use async_trait::async_trait;
use rayon::prelude::*;
use tracing::warn;

/// EventsExtractor is a step that extracts events and their metadata from transactions.
pub struct EventsExtractor
where
    Self: Sized + Send + 'static, {}

#[async_trait]
impl Processable for EventsExtractor {
    type Input = Transaction;
    type Output = EventModel;
    type RunType = AsyncRunType;

    async fn process(
        &mut self,
        item: TransactionContext<Transaction>,
    ) -> Result<Option<TransactionContext<EventModel>>, ProcessorError> {
        let events = item
            .data
            .par_iter()
            .map(|txn| {
                let txn_version = txn.version as i64;
                let block_height = txn.block_height as i64;
                let txn_data = match txn.txn_data.as_ref() {
                    Some(data) => data,
                    None => {
                        warn!(
                            transaction_version = txn_version,
                            "Transaction data doesn't exist"
                        );
                        return vec![];
                    }
                };
                let default = vec![];
                let raw_events = match txn_data {
                    TxnData::BlockMetadata(tx_inner) => &tx_inner.events,
                    TxnData::Genesis(tx_inner) => &tx_inner.events,
                    TxnData::User(tx_inner) => &tx_inner.events,
                    _ => &default,
                };

                EventModel::from_events(raw_events, txn_version, block_height)
            })
            .flatten()
            .collect::<Vec<EventModel>>();
        Ok(Some(TransactionContext {
            data: events,
            start_version: item.start_version,
            end_version: item.end_version,
            start_transaction_timestamp: item.start_transaction_timestamp,
            end_transaction_timestamp: item.end_transaction_timestamp,
            total_size_in_bytes: item.total_size_in_bytes,
        }))
    }
}

impl AsyncStep for EventsExtractor {}

impl NamedStep for EventsExtractor {
    fn name(&self) -> String {
        "EventsExtractor".to_string()
    }
}
