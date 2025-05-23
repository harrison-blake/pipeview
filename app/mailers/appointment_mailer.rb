class AppointmentMailer < ApplicationMailer
  def appointment_notification(appointment)
    @appointment = appointment
    mail(
      to: User.first[:email],
      subject: "Testing"
    )
  end
end
