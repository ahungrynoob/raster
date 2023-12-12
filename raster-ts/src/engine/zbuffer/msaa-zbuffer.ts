/**
 * msaa的深度测试
 */
import { Color } from "../base/color";
import { ZBuffer } from "./interface";
import { Vec4 } from "../base/math/vec4";

export class MsaaZBuffer implements ZBuffer {
    private readonly width: number;
    private readonly height: number;
    private readonly msaa: number;

    private readonly msaaSize: number;

    private readonly colors: Array<Color> = undefined;

    private readonly frameBuffer: Uint8ClampedArray;

    private readonly z: Float32Array = undefined;

    private clearColor: Color = Color.BLACK.clone();

    private points: Array<Vec4> = undefined;


    constructor(width: number, height: number, msaa: number) {
        msaa >>= 0;
        this.width = width;
        this.height = height;
        this.msaa = msaa;
        this.msaaSize = msaa * msaa;
        const size = width * height * this.msaaSize;
        this.colors = new Array<Color>(size);
        for (let i = 0; i < size; i++) {
            this.colors[i] = new Color();
        }
        this.z = new Float32Array(size);
        // for (let i = 0, len = this.z.length; i < len; i++) {
        //     this.z[i] = undefined;
        // }

        this.points = [
            new Vec4(0.125, 0.325),
            new Vec4(-0.125, -0.325),
            new Vec4(0.325, -0.125),
            new Vec4(-0.325, 0.125),
        ];

        this.clear();
    }

    private getZPosition(x: number, y: number, index: number): number {
        return (this.width * y + x) * this.msaaSize + index;
    }

    public zTest(x: number, y: number, z: number, index: number): boolean {
        const zPos = this.getZPosition(x, y, index);
        return isNaN(this.z[zPos]) || this.z[zPos] < z;
    }

    public setZ(x: number, y: number, z: number, index: number): void {
        const zPos = this.getZPosition(x, y, index);
        this.z[zPos] = z;
    }


    public setClearColor(color: Color): void {
        this.clearColor.fromColor(color);
    }

    public clear(): void {
        // for (let i = 0, len = this.width * this.height; i < len; i++) {
        //     this.frameBuffer[i] = this.clearColor.r;
        //     this.frameBuffer[i + 1] = this.clearColor.g;
        //     this.frameBuffer[i + 2] = this.clearColor.b;
        //     this.frameBuffer[i + 3] = this.clearColor.a;
        // }
        for (let i = 0, len = this.colors.length; i < len; i++) {
            this.colors[i].fromColor(this.clearColor);
        }
        for (let i = 0, len = this.z.length; i < len; i++) {
            this.z[i] = NaN;
        }
    }

    public isFull(x: number, y: number): boolean {
        // return this.z[(x + y * this.width)  * this.msaa * this.msaa] !== undefined;
        return true;
    }

    public getColor(x: number, y: number): Color {

        const index = this.getZPosition(x, y, 0);

        const color = new Color();
        for (let i = 0, len = this.msaaSize; i < len; i++) {
            color.r += this.colors[i + index].r / this.msaa;
            color.g += this.colors[i + index].g / this.msaa;
            color.b += this.colors[i + index].b / this.msaa;
            // color.a += this.colors[i + index].a / len;
        }
        return color;
    }

    public setColor(x: number, y: number, z: number, color: Color): void {
        // x = x >> 0;
        // y = y >> 0;
        // const index = x + y * this.width;
        // const tempColor = this.colors[index];
        // if (!tempColor) {
        //     return;
        // }
        // const nz = this.z[index];
        // if (nz === undefined || z > nz) {
        //     this.z[index] = z;
        //     tempColor.fromColor(color);
        // }
    }

    public setMsaaColor(x: number, y: number, z: number, color: Color, i: number): void {
        // x = x >> 0;
        // y = y >> 0;
        // const index = (x + y * this.width) * this.msaa * this.msaa;
        // const tempColor = this.colors[index + i];
        // if (!tempColor) {
        //     return;
        // }
        // const nz = this.z[index];
        // if (nz === undefined || z > nz) {
        //     this.z[index] = z;
        //     tempColor.fromColor(color);
        // }
        x >>= 0;
        y >>= 0;
        const index = this.getZPosition(x, y, i);
        const tempColor = this.colors[index + i];
        if (!tempColor) {
            return;
        }
        tempColor.fromColor(color);
    }

    public getPoints(): Array<Vec4> {
        return this.points;
    }

    public applyMSAAFilter(x: number, y: number): void {
        const index = this.getZPosition(x, y, 0);
        // let color: Color = new Color();
        for (let i = 0; i < this.msaaSize; i++) {
            // let colorStart = index + i;
            // let r = this.colors[colorStart].r;
            // let g = this.colors[colorStart].g;
            // let b = this.colors[colorStart].b;
            // let a = this.colors[colorStart].a;
            // color.r += 0.25 * r * 2;
            // color.g += 0.25 * g * 2;
            // color.b += 0.25 * b * 2;
            // color.a += 0.25 * a * 2;


            const color = this.colors[index + i];

            this.frameBuffer[index] += color.r / this.msaa;
            this.frameBuffer[index+1] += color.g / this.msaa;
            this.frameBuffer[index+2] += color.b / this.msaa;
            this.frameBuffer[index+3] = 255;
            // this.frameBuffer[index+3] += color.a / this.msaa;
        }
    }

}