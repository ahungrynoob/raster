import { VAO } from "../data/vao";

export class Primitives {

    // 正方体的VAO
    public static cube(): VAO {
        return {
            position: [
                // front
                -0.5, -0.5, 0.5,
                -0.5, 0.5, 0.5,
                0.5, 0.5, 0.5,
                0.5, -0.5, 0.5,
                // back
                -0.5, -0.5, -0.5,
                -0.5, 0.5, -0.5,
                0.5, 0.5, -0.5,
                0.5, -0.5, -0.5,
            ],
            color: [
                0.0, 0.0, 0.0,
                0.0, 1.0, 0.0,
                1.0, 1.0, 0.0,
                1.0, 0.0, 0.0,
                0.0, 0.0, 1.0,
                0.0, 1.0, 1.0,
                1.0, 1.0, 1.0,
                1.0, 0.0, 1.0,
            ],
            uv: [],
            tangent: [],
            normal: [],
            indices: [
                0, 1, 2, 2, 3, 0, // front
                4, 5, 6, 6, 7, 4, // back
                3, 2, 6, 6, 7, 3, // right
                0, 1, 5, 5, 4, 0, // left
                1, 5, 6, 6, 2, 1, // top
                0, 4, 7, 7, 3, 0, // bottom
            ],
        };
    }


    // 三角形的VAO
    public static triangle(): VAO {
        return {
            position: [
                -0.5, -0.5, 0.0,
                0.5, -0.5, 0.0,
                0.0, 0.5, 0.0],
            color: [
                1.0, 0.0, 0.0,
                0.0, 1.0, 0.0,
                0.0, 0.0, 1.0],
            uv: [],
            tangent: [],
            normal: [],
            indices: [0, 1, 2],
        };
    }


    // 正方形面
    public static quad(): VAO {
        return {
            position: [
                // front
                -0.5, -0.5, 0.,
                -0.5, 0.5, 0.,
                0.5, 0.5, 0.,
                0.5, -0.5, 0.,
            ],
            color: [
                1.0, 0.0, 0.0,
                0.0, 1.0, 0.0,
                0.0, 0.0, 1.0,
                1.0, 1.0, 0.0,
            ],
            uv: [
                0.0, 1.0,
                0.0, 0.0,
                1.0, 0.0,
                1.0, 1.0,
            ],
            tangent: [],
            normal: [],
            indices: [
                0, 1, 2, 2, 3, 0,
            ],
        };
    }

    // 面板
    public static plane(): VAO {
        return {
            position: [
                // front
                -0.5, 0., -0.5,
                -0.5, 0., 0.5,
                0.5, 0., 0.5,
                0.5, 0., -0.5,
            ],
            color: [
                1.0, 0.0, 0.0,
                0.0, 1.0, 0.0,
                0.0, 0.0, 1.0,
                1.0, 1.0, 0.0,
            ],
            uv: [
                0.0, 1.0,
                0.0, 0.0,
                1.0, 0.0,
                1.0, 1.0,
            ],
            tangent: [],
            normal: [],
            indices: [
                0, 1, 2, 2, 3, 0,
            ],
        };
    }
}