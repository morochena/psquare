class Project < ApplicationRecord
  belongs_to :session
  has_many :scores, dependent: :destroy

  def avg_effort_score
    score = scores.map { |score| score.effort_score }.sum.to_f / scores.count || 0
    return score.nan? ? 0 : score
  end

  def avg_impact_score
    score = scores.map { |score| score.impact_score }.sum.to_f / scores.count || 0
    return score.nan? ? 0 : score
  end

  def voter_uuids
    scores.map { |score| score.uuid }
  end

  def votes_by_voter
    scores.reduce({}) do |hash, score|
      hash[score.uuid] = { name: score.username, effort_score: score.effort_score, impact_score: score.impact_score }
      hash
    end.to_json
  end

  after_create_commit { broadcast_append_to self.session, :projects }
  after_update_commit { broadcast_replace_to self.session, :projects }
  after_destroy_commit { broadcast_remove_to self.session, :projects }
end
