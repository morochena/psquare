class Project < ApplicationRecord
  belongs_to :session

  after_create_commit { broadcast_append_to self.session.id, :projects }
end
