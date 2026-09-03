//////////////////////////////////////////////////////////////////////////////////////////////////////////////
async function getMediaStream(audioConstraints, videoConstraints) {
    const constraints = {
        audio: audioConstraints,
        video: videoConstraints
    };
    return await navigator.mediaDevices.getUserMedia(constraints);
}
async function getVideoStream(mode, width, height) {
    return await getMediaStream(false, { facingMode: mode, width: { ideal: width }, height: { ideal: height } });
}
/*
async function displayVideoStream(element:HTMLVideoElement, idealWidth:number, idealHeight:number):Promise<void>
    {
    element.srcObject = await getVideoStream("environment", idealWidth, idealHeight);
    }
*/
async function getOffscreenCanvasFromImageBlob(blob) {
    const bitmap = await createImageBitmap(blob);
    const { width, height } = bitmap;
    const canvas = new OffscreenCanvas(width, height);
    const context = canvas.getContext("2d");
    canvas.width = width;
    canvas.height = height;
    context.drawImage(bitmap, 0, 0);
    return canvas;
}
function canvasDrawLineBetweenPoints(context, points, color, close = false) {
    const n = points.length;
    context.beginPath();
    context.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < n; i++) {
        context.lineTo(points[i].x, points[i].y);
    }
    if (close) {
        context.lineTo(points[0].x, points[0].y);
    }
    context.strokeStyle = color;
    context.stroke();
}
/*
function getAverageColor(context:CanvasImageData, x:number, y:number, width:number, height:number):RedGreenBlue
    {
    const count:number = width * height;

    let red:number = 0, green:number = 0, blue:number = 0;

    //const pixels:ImageDataArray = context.getImageData(x, y, width, height).data;
    const pixels = context.getImageData(x, y, width, height).data;

    for (let i = 0; i < pixels.length; i += 4)
        {
        red += pixels[i];
        green += pixels[i + 1];
        blue += pixels[i + 2];
        }

    red = Math.round(red / count);
    green = Math.round(green / count);
    blue = Math.round(blue / count);

    return {red, green, blue} as RedGreenBlue;
    }
*/
/*
function getAverageColors(context:CanvasImageData, imageWidth:number, imageHeight:number, columns:number, rows:number):Array<Array<RedGreenBlue>>
    {
    const cellWidth:number = Math.floor(imageWidth / columns);
    const cellHeight:number = Math.floor(imageHeight / rows);

    const colors = new Array<Array<RedGreenBlue>>();

    for (let y = 0; y < rows; y++)
        {
        const row = new Array<RedGreenBlue>();

        for (let x = 0; x < columns; x++)
            {
            row.push(getAverageColor(context, x * cellWidth, y * cellHeight, cellWidth, cellHeight));
            }

        colors.push(row);
        }

    return colors;
    }
*/
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
export { getMediaStream, getVideoStream, getOffscreenCanvasFromImageBlob, canvasDrawLineBetweenPoints };
