#[cfg(test)]
mod tests {
    use crate::models::todo;
    use crate::types::client::todo::UpdateTodo;
    use chrono::Local;
    use sea_orm::{entity::prelude::*, DatabaseBackend, MockDatabase, MockExecResult};

    #[tokio::test]
    async fn insert() -> Result<(), DbErr> {
        let now = Local::now().naive_local();
        let db = MockDatabase::new(DatabaseBackend::MySql)
            .append_query_results([[todo::Model {
                id: 1,
                content: "テスト登録です".to_string(),
                created_at: now,
                updated_at: now,
            }]])
            .append_exec_results([MockExecResult {
                last_insert_id: 1,
                rows_affected: 1,
            }])
            .into_connection();
        let todo = UpdateTodo {
            content: "テスト登録です".to_string(),
        };

        // テスト実施
        assert_eq!(
            todo::insert(&db, &todo).await?,
            todo::Model {
                id: 1,
                content: "テスト登録です".to_string(),
                created_at: now,
                updated_at: now,
            }
        );
        Ok(())
    }

    #[tokio::test]
    async fn update() -> Result<(), DbErr> {
        let now = Local::now().naive_local();
        let db = MockDatabase::new(DatabaseBackend::MySql)
            .append_query_results([
                [todo::Model {
                    id: 1,
                    content: "テスト登録です".to_string(),
                    created_at: now,
                    updated_at: now,
                    }
                ],
                [todo::Model {
                    id: 1,
                    content: "更新テスト登録です".to_string(),
                    created_at: now,
                    updated_at: now,
                }]
            ])
            .append_exec_results([
                MockExecResult {
                    last_insert_id: 1,
                    rows_affected: 1,
                },
                MockExecResult {
                    last_insert_id: 1,
                    rows_affected: 1,
                }
            ])
            .into_connection();
        // テスト実施
        let todo = todo::Model {
            id: 1,
            content: "更新テスト登録です".to_string(),
            created_at: now,
            updated_at: now,
        };
        let updated_todo = todo.update(&db).await?;

        // 期待値確認
        assert_eq!(
            updated_todo,
            todo::Model {
                id: 1,
                content: "更新テスト登録です".to_string(),
                created_at: now,
                updated_at: now,
            }
        );
        Ok(())
    }
}
