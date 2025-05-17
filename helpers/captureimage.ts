import html2canvas from 'html2canvas';

const captureImage = async (ref: React.RefObject<HTMLElement>): Promise<Blob | null> => {
  if (!ref.current) return null;

  const canvas = await html2canvas(ref.current, {
    backgroundColor: null,
    useCORS: true,
    scale: 2,
  });

  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      resolve(blob);
    }, 'image/png');
  });
};

export default captureImage;
