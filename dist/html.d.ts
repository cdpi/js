import { Point2D } from "./geometry.js";
type AudioOff = false;
type AudioOn = {};
type AudioConstraints = AudioOff | AudioOn;
type FacingMode = "user" | "environment" | "left" | "right";
type VideoOff = false;
type VideoOn = {
    facingMode: FacingMode;
    width: {
        ideal: number;
    };
    height: {
        ideal: number;
    };
};
type VideoConstraints = VideoOff | VideoOn;
declare function getMediaStream(audioConstraints: AudioConstraints, videoConstraints: VideoConstraints): Promise<MediaStream>;
declare function getVideoStream(mode: FacingMode, width: number, height: number): Promise<MediaStream>;
declare function getOffscreenCanvasFromImageBlob(blob: Blob): Promise<OffscreenCanvas>;
declare function canvasDrawLineBetweenPoints(context: CanvasRenderingContext2D, points: Array<Point2D>, color: string, close?: boolean): void;
export { type AudioOff, type AudioOn, type AudioConstraints, type FacingMode, type VideoOff, type VideoOn, type VideoConstraints, getMediaStream, getVideoStream, getOffscreenCanvasFromImageBlob, canvasDrawLineBetweenPoints };
