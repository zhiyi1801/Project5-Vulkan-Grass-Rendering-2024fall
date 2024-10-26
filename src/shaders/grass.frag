#version 450
#extension GL_ARB_separate_shader_objects : enable

layout(set = 0, binding = 0) uniform CameraBufferObject {
    mat4 view;
    mat4 proj;
} camera;

layout(location = 0) in vec2 in_uv;
layout(location = 1) in vec3 pos;
layout(location = 2) in vec3 norm;

layout(location = 0) out vec4 outColor;

// simple flat color gradient
void main() {
    // note in_uv.y -> corresponds to height, .x width of each blade model
    vec3 topColor = vec3(1.0, 1.0, 0.2);
    vec3 bottomColor = vec3(0.2, 0.6, 0.1);

    float mixFactor = 2 * in_uv.y - in_uv.y * in_uv.y;
    vec3 camPos = inverse(camera.view)[3].xyz;
    vec3 lightDir = normalize(camPos - pos);
    vec3 color = mix(bottomColor, topColor, mixFactor) * max(abs(dot(lightDir, norm)), 0.1);
    //vec3 color = mix(bottomColor, topColor, in_uv.y);
    color = pow(color, vec3(1.0 / 2.2));
    outColor = vec4(color, 1.);
}