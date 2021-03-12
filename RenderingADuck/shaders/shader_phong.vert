#version 450
#extension GL_ARB_separate_shader_objects : enable

layout(binding = 0) uniform UniformBufferObject {
    mat4 model;
    mat4 view;
    mat4 proj;
} ubo;

// The inPosition and inColor variables are vertex attributes
// They're properties that are specified per-vertex in the vertex buffer
// NOTE: The vertex shader takes input from a vertex buffer using the in keyword
layout(location = 0) in vec3 inPosition;
layout(location = 1) in vec3 inColor;
layout(location = 2) in vec2 inTexCoord;
layout(location = 3) in vec3 inNormal;

layout(location = 0) out vec3 fragColor;
layout(location = 1) out vec2 fragTexCoord;
layout(location = 2) out vec3 fragPos;
layout(location = 3) out vec3 lightPos;
layout(location = 4) out vec3 normal;
layout(location = 5) out vec3 viewPos;

vec3 inLightPos = {-20,-50,50};
vec3 specularViewPos = {1,1,1};

void main() {
    gl_Position = ubo.proj * ubo.view * ubo.model * vec4(inPosition, 1.0);

    fragColor = inColor;
    fragTexCoord = inTexCoord;
    fragPos = inPosition;
    lightPos = inLightPos;
    normal = inNormal;
    viewPos = specularViewPos;
}