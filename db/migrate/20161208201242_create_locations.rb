class CreateLocations < ActiveRecord::Migration[5.0]
  def change
    create_table :locations do |t|
      t.string :user_id
      t.float :latitude
      t.float :longitude

      t.timestamps
    end
  end
end
