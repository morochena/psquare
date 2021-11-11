require_relative "boot"

require "rails/all"

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module Psquare
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 6.1

    ENV['DATABASE_URL'] = ENV['CLOUDRON_POSTGRESQL_URL'] unless ENV['DATABASE_URL'].present?
    ENV['REDIS_URL'] = ENV['CLOUDRON_REDIS_URL'] unless ENV['REDIS_URL'].present?

    # Configuration for the application, engines, and railties goes here.
    #
    # These settings can be overridden in specific environments using the files
    # in config/environments, which are processed later.
    #
    # config.time_zone = "Central Time (US & Canada)"
    # config.eager_load_paths << Rails.root.join("extras")
  end
end
