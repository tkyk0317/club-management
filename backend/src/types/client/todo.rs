use serde::{Deserialize, Serialize};

#[derive(Deserialize, Serialize)]
pub struct UpdateTodo {
    pub content: String,
}
