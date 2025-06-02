#define PHONG

uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;

uniform float time;
varying vec2 vUv;
varying vec3 newPosition;
varying float noise;

#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <uv2_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>

void main() {
	#include <clipping_planes_fragment>

  // Enhanced color calculation with better gradients
  float timeOffset = time * 0.5;
  vec3 baseColor = vec3(0.1, 0.8, 0.9); // Cyan-like base
  vec3 accentColor = vec3(0.9, 0.2, 0.8); // Magenta accent

  // Create dynamic color mixing based on noise and time
  float colorMix = sin(noise * 3.0 + timeOffset) * 0.5 + 0.5;
  vec3 dynamicColor = mix(baseColor, accentColor, colorMix);

  // Add depth-based color variation
  float depth = gl_FragCoord.z;
  vec3 depthColor = vec3(0.2, 0.4, 1.0); // Blue depth
  dynamicColor = mix(dynamicColor, depthColor, depth * 0.3);

  // Enhanced final color calculation
  vec3 color = dynamicColor * (0.8 + noise * 0.4);
  vec3 finalColors = vec3(
    color.r * (1.0 + sin(timeOffset * 2.0) * 0.2),
    color.g * (1.0 + cos(timeOffset * 1.5) * 0.2),
    color.b * (1.0 + sin(timeOffset * 3.0) * 0.2)
  );

  vec4 diffuseColor = vec4(finalColors, 0.9);
ReflectedLight reflectedLight = ReflectedLight(vec3(0.0), vec3(0.0), vec3(0.0), vec3(0.0));
vec3 totalEmissiveRadiance = emissive;

	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>

	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
  
	#include <envmap_fragment>
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>

  gl_FragColor = vec4(outgoingLight, diffuseColor.a);
}
