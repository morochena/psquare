class Score < ApplicationRecord
  belongs_to :project

  after_create_commit { project.touch }
  after_update_commit { project.touch }
end
