module SummariesHelper

  def total_time(total)
    base_string = "#{total} seconds"
    if total >= 60
      total_min = total / 60
      total_sec = total - (total_min * 60)

      return total_min > 1 ?  "#{total_min} minutes #{total_sec} seconds" : "#{total_min} minute #{total_sec} seconds"
    else 
      base_string
    end

  end

end
