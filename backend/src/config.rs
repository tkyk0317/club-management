use derive_getters::Getters;
use dotenv::dotenv;

static mut SINGLETON_CONFIGURATION: Option<Configuration> = None;

#[derive(Debug, Getters)]
pub struct Configuration {
    database_url: String,
}

pub fn config() -> &'static Configuration {
    unsafe {
        if SINGLETON_CONFIGURATION.is_none() {
            dotenv().ok();
            SINGLETON_CONFIGURATION = Some(Configuration {
                database_url: dotenv::var("DATABASE_URL").expect("could not load DATABASE_URL"),
            });
        }
        SINGLETON_CONFIGURATION.as_ref().unwrap()
    }
}
