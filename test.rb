require "date"

# create hash table with the following format 
# "2025-05-03" => [
#     {
#       ["2:00 PM", "3:00 PM", "4:00 PM"...]
#     }
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

	range = range.reject do |hour|
		time = Time.new(day.year, day.month, day.day, 10, 0, 0)
		hour == time
	end

	hash[day.to_s] = range
end

puts dates["2025-05-20"]
