import { useState } from 'react';
import { IssueList } from '../components/IssueList';
import { LabelPicker } from '../components/LabelPicker';
import useIssuesList from '../hooks/useIssuesList';
import LoadingIcon from '../../shared/components/LoadingIcon';


export const ListView = () => {

  const [selectedLabels, setSelectedLabels] = useState<string[]>([])
  
  const { issuesQuery } = useIssuesList()

  const onLabelChanged = (labelName: string) => {
    ( selectedLabels.includes(labelName) )
      ? setSelectedLabels(selectedLabels.filter(label => label !== labelName))
      : setSelectedLabels([...selectedLabels, labelName])
  }

  return (
    <div className="row mt-5">
      
      <div className="col-8">
        {
          issuesQuery.isLoading
            ? <LoadingIcon />
            : <IssueList issues={issuesQuery.data || []} />
        }
      </div>
      
      <div className="col-4">
        <LabelPicker
          selectedLabels={selectedLabels}
          onLabelChanged={onLabelChanged}
        />
      </div>
    </div>
  )
}
