class CreateScores < ActiveRecord::Migration[6.1]
  def change
    create_table :scores do |t|
      t.integer :impact_score
      t.integer :effort_score
      t.string :username
      t.references :project, null: false, foreign_key: true


      t.timestamps
    end
  end
end
