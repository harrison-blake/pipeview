class AddEmailToAppointments < ActiveRecord::Migration[8.0]
  def change
    add_column :appointments, :email, :string
  end
end
