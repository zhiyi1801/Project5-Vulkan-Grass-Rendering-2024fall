#version 450
#extension GL_ARB_separate_shader_objects : enable

layout(set = 0, binding = 0) uniform CameraBufferObject {
    mat4 view;
    mat4 proj;
} camera;

layout(location = 0) in vec2 in_uv;

layout(location = 0) out vec4 outColor;

// simple flat color gradient
void main() {
    // note in_uv.y -> corresponds to height, .x width of each blade model
    vec3 topColor = vec3(1.0, 1.0, 0.2);
    vec3 bottomColor = vec3(0.2, 0.6, 0.1);

    outColor = vec4(mix(bottomColor, topColor, in_uv.y), 1.);
}