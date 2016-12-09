class CreateUsers < ActiveRecord::Migration[5.0]
  def change
    create_table :users do |t|
      t.string :name, null: false
      t.string :email, null: false, uniqueness: true
      t.string :password_digest
      t.string :city, null: false
      t.string :current_address

      t.timestamps(null: false)
    end
  end
end
