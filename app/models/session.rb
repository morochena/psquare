class Session < ApplicationRecord

  has_many :projects, dependent: :destroy

  before_create :generate_slug

  def generate_slug
    self.slug = SecureRandom.hex(10)
  end

  after_update_commit { broadcast_replace }
end
