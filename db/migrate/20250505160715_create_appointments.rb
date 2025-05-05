class CreateAppointments < ActiveRecord::Migration[8.0]
  def change
    create_table :appointments do |t|
      t.string :name
      t.string :phone
      t.datetime :preferred_time

      t.timestamps
    end
  end
end
