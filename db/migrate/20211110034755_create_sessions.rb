class CreateSessions < ActiveRecord::Migration[6.1]
  def change
    create_table :sessions do |t|
      t.string :name
      t.string :slug

      t.timestamps

      t.index :slug, unique: true
    end
  end
end
