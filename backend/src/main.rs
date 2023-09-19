#[macro_use]
extern crate env_logger;
extern crate dotenv;

mod config;
mod controllers;
mod db;
mod models;
mod routes;
mod types;

use actix_web::{App, HttpServer};
use log::info;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    env_logger::init_from_env(env_logger::Env::new().default_filter_or("info"));
    info!("starting HTTP server at http://localhost:8080");

    HttpServer::new(move || App::new().configure(routes::config))
        .bind(("0.0.0.0", 8080))?
        .run()
        .await
}
