import { useRef, useState } from 'react';
import { FileImage, Trash2, Upload } from 'lucide-react';

export const DEFAULT_MAX_ARTWORK_SIZE_BYTES = 100 * 1024 * 1024;
const allowedExtensions = new Set([
  '.pdf',
  '.ai',
  '.cdr',
  '.psd',
  '.tif',
  '.tiff',
  '.png',
  '.jpg',
  '.jpeg',
  '.dwg',
  '.dxf',
]);
const acceptedTypes =
  '.pdf,.ai,.cdr,.psd,.tif,.tiff,.png,.jpg,.jpeg,.dwg,.dxf';

function formatFileSize(bytes) {
  if (bytes < 1024 * 1024) {
    return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  }
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function ArtworkUpload({
  id,
  label = 'Artwork & reference files',
  maxFileSizeBytes = DEFAULT_MAX_ARTWORK_SIZE_BYTES,
  initialSelection = null,
  onSelectionChange,
}) {
  const inputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(initialSelection);
  const [message, setMessage] = useState('');

  function handleChange(event) {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    const extension = file.name.match(/\.[^.]+$/)?.[0].toLowerCase() ?? '';
    if (!allowedExtensions.has(extension)) {
      setSelectedFile(null);
      onSelectionChange?.(null);
      setMessage('Choose a PDF, AI, CDR, PSD, TIFF, PNG, JPG, DWG, or DXF file.');
      event.target.value = '';
      return;
    }

    if (file.size > maxFileSizeBytes) {
      setSelectedFile(null);
      onSelectionChange?.(null);
      setMessage(
        `This file exceeds the ${formatFileSize(maxFileSizeBytes)} local selection limit.`,
      );
      event.target.value = '';
      return;
    }

    const selection = { name: file.name, size: file.size };
    setSelectedFile(selection);
    onSelectionChange?.(selection);
    setMessage('Selected in this browser only. No upload or technical review occurred.');
  }

  function removeSelection() {
    setSelectedFile(null);
    onSelectionChange?.(null);
    setMessage('No file selected.');
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  }

  return (
    <div className="artwork-upload">
      <input
        accept={acceptedTypes}
        className="artwork-upload__input"
        id={id}
        onChange={handleChange}
        ref={inputRef}
        type="file"
      />
      <label className="artwork-upload__dropzone" htmlFor={id}>
        <span className="artwork-upload__icon">
          {selectedFile ? <FileImage aria-hidden="true" size={22} /> : <Upload aria-hidden="true" size={22} />}
        </span>
        <strong>{selectedFile ? selectedFile.name : label}</strong>
        <span>
          PDF, AI, CDR, PSD, TIFF, PNG, JPG, DWG, or DXF · up to{' '}
          {formatFileSize(maxFileSizeBytes)} per file
        </span>
        {selectedFile?.size > 0 && (
          <span className="artwork-upload__size">
            {formatFileSize(selectedFile.size)}
          </span>
        )}
        <span className="artwork-upload__button">
          <Upload aria-hidden="true" size={15} />
          {selectedFile ? 'Replace file' : 'Browse files'}
        </span>
      </label>
      {selectedFile && (
        <button
          aria-label={`Remove ${selectedFile.name}`}
          className="artwork-upload__remove"
          onClick={removeSelection}
          type="button"
        >
          <Trash2 aria-hidden="true" size={15} />
          Remove
        </button>
      )}
      <p aria-live="polite" className="artwork-upload__status" role="status">
        {message || 'Files remain on this device. They are not uploaded or reviewed.'}
      </p>
    </div>
  );
}
