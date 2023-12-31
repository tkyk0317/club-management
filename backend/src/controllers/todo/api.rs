use crate::models::todo;
use crate::db;
use crate::types::client::todo::UpdateTodo as ClientUpdateTodo;
use actix_web::{web, HttpResponse};
use log::error;

pub async fn get() -> HttpResponse {
    let db = db::establish_connection()
        .await
        .expect("Could not connect");
    let todo_list = todo::get(&db).await;

    HttpResponse::Ok().json(todo_list)
}

pub async fn create(c: web::Json<ClientUpdateTodo>) -> HttpResponse {
    let new_todo = ClientUpdateTodo {
        content: c.content.to_string(),
    };

    let db = db::establish_connection()
        .await
        .expect("Could not connect");
    match todo::insert(&db, &new_todo).await {
        Ok(todo) => HttpResponse::Ok().json(todo),
        Err(err) => {
            error!("[todo/api.rs:create] {:?}", err);
            HttpResponse::InternalServerError().json(err.to_string())
        }
    }
}

pub async fn update(todo: web::Json<todo::Model>) -> HttpResponse {
    let db = db::establish_connection()
        .await
        .expect("Could not connect");
    let todo = todo.update(&db).await;

    HttpResponse::Ok().json(todo.expect("Not found todo"))
}