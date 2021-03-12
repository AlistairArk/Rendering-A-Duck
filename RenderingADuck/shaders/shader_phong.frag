#version 450
#extension GL_ARB_separate_shader_objects : enable

layout(binding = 1) uniform sampler2D texSampler;

layout(location = 0) in vec3 fragColor;
layout(location = 1) in vec2 fragTexCoord;
layout(location = 2) in vec3 fragPos;
layout(location = 3) in vec3 lightPos;
layout(location = 4) in vec3 normal;
layout(location = 5) in vec3 viewPos;

layout(location = 0) out vec4 outColor;


vec3 ambient;
vec3 diffuse;
vec4 specular;
bool light = true;

void main() {
    vec4 color = texture(texSampler, fragTexCoord);

    if (!light){
        outColor = color;
    }else{
        // ambient
        vec4 ambient = 0.05 * color;

        // diffuse
        vec3 lightDir = normalize(lightPos - fragPos);
        float diff = dot(lightDir, normal);
        vec4 diffuse = diff * color;

        // specular
        vec3 viewDir = normalize(viewPos - fragPos);
        vec3 reflectDir = reflect(-lightDir, normal);
        float spec;
        
        // Phong
        vec3 halfwayDir = normalize(lightDir + viewDir);  
        spec = pow(max(dot(normal, halfwayDir), 0.0), 32.0);


        specular = vec4(0.3) * spec; // assuming bright white light color

        outColor = vec4(ambient + diffuse + specular);
    }
}