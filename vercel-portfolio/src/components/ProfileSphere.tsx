import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ProfileSphere() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;
    const container = mountRef.current;

    // Match the container size (set via CSS)
    const rect = container.getBoundingClientRect();
    const width = rect.width || 500;
    const height = rect.height || 500;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.domElement.style.pointerEvents = 'none';
    container.appendChild(renderer.domElement);

    const geometry = new THREE.IcosahedronGeometry(2, 15);
    const material = new THREE.ShaderMaterial({
      vertexShader: `
        uniform float uTime;
        varying float vNoise;
        void main() {
          vec3 pos = position;
          pos += normal * sin(pos.x * 2.0 + uTime) * 0.1;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
          vNoise = pos.z;
        }
      `,
      fragmentShader: `
        varying float vNoise;
        void main() {
          gl_FragColor = vec4(0.02, 0.71, 0.83, 0.3);
        }
      `,
      uniforms: { uTime: { value: 0 } },
      wireframe: true,
      transparent: true,
    });

    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);
    camera.position.z = 3.8;

    let animationId: number;
    let time = 0;

    let targetRotationX = 0;
    let targetRotationY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      targetRotationX = (e.clientX / window.innerWidth) * 2 - 1;
      targetRotationY = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      time += 0.01;

      material.uniforms.uTime.value = time;

      sphere.rotation.y += 0.002 + (targetRotationX * 0.5 - sphere.rotation.y) * 0.05;
      sphere.rotation.x += (targetRotationY * 0.5 - sphere.rotation.x) * 0.05;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      const newRect = container.getBoundingClientRect();
      const w = newRect.width || 500;
      const h = newRect.height || 500;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -42%)',
        width: '500px',
        height: '500px',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  );
}
