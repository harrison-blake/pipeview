class AppointmentMailer < ApplicationMailer
  default from: "anthony.scott@pipeview.pro"

  def appointment_notification(appointment)
    @appointment = appointment
    mail(
      to: User.first.email,
      subject: "New Appointment #{appointment.preferred_time.strftime("%A, %B %-d at %-l:%M %p")}",
    )
  end

  def test_email
    mail(
      to: "hrblake2@gmail.com",
      subject: "Test Email from Pipeview"
    ) do |format|
      format.text { render plain: "This is a test email sent via SendGrid." }
    end
  end
end
