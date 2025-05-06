class Admin::DashboardController < Admin::BaseController
  def index 
    @appointments = Appointment.order(preferred_time: :asc)
  end
end
