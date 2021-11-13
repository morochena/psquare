FROM ruby:3.0.0-rc1
RUN apt-get update -qq && apt-get install -y nodejs postgresql-client && \
  curl -sL https://deb.nodesource.com/setup_10.x | bash - && \
  curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - && \
  echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list && \
  apt-get update && apt-get install -y nodejs yarn

RUN yarn config set cache-folder /tmp/yarn

RUN bundle config --global frozen 1

WORKDIR /run/app
COPY Gemfile /run/app/Gemfile
COPY Gemfile.lock /run/app/Gemfile.lock
RUN bundle install
COPY . /run/app

# Add a script to be executed every time the container starts.
COPY entrypoint.sh /usr/bin/
RUN chmod +x /usr/bin/entrypoint.sh
ENTRYPOINT ["entrypoint.sh"]
EXPOSE 3000

ENV RAIS_ENV production
ENV RAILS_SERVE_STATIC_FILES true 

RUN bundle exec rails assets:precompile

# Start the main process.
CMD ["rails", "server", "-b", "0.0.0.0"]