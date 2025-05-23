class AppointmentsController < ApplicationController
	def new
  		@appointment = Appointment.new
  		@slots_by_day = generate_slots_by_day(Date.current)
	end

	def create
    	@appointment = Appointment.new(appointment_params)

    	if @appointment.save
    		AppointmentMailer.appointment_notification(@appointment).deliver_later
      		flash[:notice] = "Thanks #{@appointment.name}! Your inspection is booked for #{@appointment.preferred_time.strftime('%A, %B %e at %l:%M %p')}."
      		redirect_to root_path
    	else
      		flash.now[:alert] = "Please fix the errors below."
      		@slots_by_day = generate_slots_by_day(Date.current, 3.months.from_now.to_date)
      		render :new
    	end
  	end

	private
	def appointment_params
    	params.require(:appointment).permit(:name, :email, :phone, :preferred_time)
  	end

	def generate_slots_by_day(start_date)
		booked = Appointment.pluck(:preferred_time)

		dates = (Date.today..Date.today.next_month(3)).each_with_object({}) do |day, hash|
			if day.saturday? || day.sunday?
				range = (8..18).map do |hour|
					Time.new(day.year, day.month, day.day, hour, 0, 0)
				end
			else
				range = (14..20).map do |hour|
					Time.new(day.year, day.month, day.day, hour, 0, 0)
				end
			end

			range = range.reject { |hour| booked.include?(hour) }
			hash[day.to_s] = range.map do |time|
			{
				time: time.iso8601,
				label: time.strftime("%-I:%M %p"),
				day_label: time.strftime("%a, %b %-d") # e.g., "Sun, May 25"
			}
			end unless range.empty?
		end
	end
end