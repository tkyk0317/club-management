use crate::controllers;
use actix_web::web;

pub fn config(cfg: &mut web::ServiceConfig) {
    cfg.service(
        web::scope("/api/todo").service(
            web::resource("")
                .route(web::post().to(controllers::todo::api::create))
                .route(web::get().to(controllers::todo::api::get)),
        )
    )
    .service(
        web::scope("/api/login").service(
            web::resource("")
                .route(web::post().to(controllers::login::api::login))
        )
    );
}
