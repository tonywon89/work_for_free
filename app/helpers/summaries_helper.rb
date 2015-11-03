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

  def pie_chart(records, title, color)
    records_hash = {}
    total_time = 0
    records.each do |record| 
      time_spent = record.time_spent
      records_hash[record.description] ||= 0
      records_hash[record.description] += time_spent
      total_time += time_spent
    end

    data = records_hash.collect { |description, time_spent| time_spent }
    labels = records_hash.collect { |description, time_spent| "#{description} (#{(100.0 *time_spent/total_time).round}%)"}

    Gchart.pie(
      title: title,
      data: data,
      labels: labels,
      bar_colors: color,
      size: '695x380'
      ) 
  end

end
