class Score < ApplicationRecord
  belongs_to :project

  validates_presence_of :effort_score, :impact_score

  after_create_commit { project.touch }
  after_update_commit { project.touch }
end
