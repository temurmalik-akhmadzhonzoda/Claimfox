import React from 'react'
import Card from '@/components/ui/Card'

type UploadState = {
  photos: boolean
  report: boolean
  license: boolean
}

type UploadStepProps = {
  uploads: UploadState
}

export default function UploadStep({
  uploads
}: UploadStepProps) {
  return (
    <>
      <Card title="Evidence upload" subtitle="Files are already attached (demo)." variant="glass" className="demo-card">
        <div style={{ display: 'grid', gap: '0.75rem' }}>
          <div
            className={`upload-tile ${uploads.photos ? 'upload-tile--done' : ''}`}
          >
            <strong>Photos of damage</strong>
            <div className="upload-tile__thumbs">
              {[0, 1, 2].map((index) => (
                <div key={index} className="upload-tile__thumb" />
              ))}
            </div>
            <span className="demo-progress">Uploaded (demo)</span>
          </div>

          <div
            className={`upload-tile ${uploads.report ? 'upload-tile--done' : ''}`}
          >
            <strong>Police report</strong>
            <span className="demo-progress">Uploaded (demo)</span>
          </div>

          <div
            className={`upload-tile ${uploads.license ? 'upload-tile--done' : ''}`}
          >
            <strong>Driver license</strong>
            <span className="demo-progress">Uploaded (demo)</span>
          </div>
        </div>
      </Card>

      <Card variant="glass" className="demo-card">
        <span className="demo-progress">Uploads are encrypted and added to your claim file (demo).</span>
      </Card>
    </>
  )
}
