vec3 pointLight(vec3 lightColor, float lightIntensity, vec3 normal, vec3 lightPosition, vec3 viewDirection, float specularPower, vec3 position, float lightDecay)
{

    vec3 lightDelta = lightPosition - position;
    float lightDistance = length(lightDelta);
    vec3 lightDirection = normalize(lightDelta);
    vec3 lightReflection = reflect(- lightDirection, normal);

    //SHADING

    float shading = dot(normal, lightDirection);
    shading = max(0.0, shading); //fix why back is negative

    //SPECULAR

    float specular =  - dot(lightReflection, viewDirection);
    specular = max(0.0, specular);
    specular = pow(specular,  specularPower);


    //DECAY


    float decay = 1.0 - lightDistance * lightDecay;
    decay = max(0.0, decay);


    return lightColor * lightIntensity * (shading + specular) * decay ;

    //return vec3(specular);



}
