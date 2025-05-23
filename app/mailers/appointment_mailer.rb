class AppointmentMailer < ApplicationMailer
  default from: "anthony.scott@pipeview.pro"

  def appointment_notification(app_id, email)
    @appointment = Appointment.find_by(id: app_id)
    unless @appointment
      Rails.logger.warn "[AppointmentMailer] Appointment not found for ID=#{appointment_id}"
      return
    end

    mail(
      to: email,
      subject: "New Appointment #{@appointment.preferred_time.strftime("%A, %B %-d at %-l:%M %p")}",
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
