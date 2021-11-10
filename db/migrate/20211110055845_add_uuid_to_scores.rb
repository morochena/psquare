class AddUuidToScores < ActiveRecord::Migration[6.1]
  def change
    add_column :scores, :uuid, :string
  end
end
