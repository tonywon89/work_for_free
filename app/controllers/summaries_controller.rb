class SummariesController < ApplicationController
  def show
    @records = current_user.records
    @totalWork = 0
    @totalRelax = 0 

    work_hash = {}
    work_data = []
    work_labels = []

    relax_hash = {}
    relax_data = []
    relax_labels = []

    @records.each do |record|
      time_spent = record.time_spent  
      record.is_work ? @totalWork += time_spent : @totalRelax += time_spent

      if record.is_work 
        if work_hash[record.description] === nil
          work_hash[record.description] = time_spent
        else
          work_hash[record.description] += time_spent
        end
      else 
        if relax_hash[record.description] === nil
          relax_hash[record.description] = time_spent
        else
          relax_hash[record.description] += time_spent
        end
      end
    end

    work_hash.each do |description, time_spent|
          work_data.push(time_spent)
          work_labels.push(description)
    end

    relax_hash.each do |description, time_spent|
      relax_data.push(time_spent)
      relax_labels.push(description)
    end

    @work_graph = Gchart.pie(
      title: "Summary of Work Activity",
      data: work_data,
      labels: work_labels,
      bar_colors: 'FF0000',
      title_color: 'FF0000',
      size: '500x300'
      )

    @relax_graph = Gchart.pie(
      title: "Summary of Relax Activity",
      data: relax_data,
      labels: relax_labels,
      bar_colors: '3DA8CC',
      title_color: 'FF0000',
      size: '500x300'
      )
    
  end
end