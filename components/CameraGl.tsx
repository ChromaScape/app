import { ScrollView, StyleSheet, Text, View } from "react-native";
import { ExpoWebGLRenderingContext, GLView } from "expo-gl";

import { useState } from "react";
import React from "react";

function onContextCreate(gl: ExpoWebGLRenderingContext) {
  gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
  gl.clearColor(0, 1, 1, 1);

  // Create vertex shader (shape & position)
  const vert = gl.createShader(gl.VERTEX_SHADER);

  if (!vert) {
    throw " no vert ";
  }
  gl.shaderSource(
    vert,
    `
      void main(void) {
        gl_Position = vec4(0.0, 0.0, 0.0, 1.0);
        gl_PointSize = 150.0;
      }
    `
  );
  gl.compileShader(vert);

  // Create fragment shader (color)
  const frag = gl.createShader(gl.FRAGMENT_SHADER);
  if (!frag) {
    throw " no frag ";
  }
  gl.shaderSource(
    frag,
    `
      void main(void) {
        gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
      }
    `
  );
  gl.compileShader(frag);

  // Link together into a program
  const program = gl.createProgram();
  if (!program) {
    throw "no program";
  }
  gl.attachShader(program, vert);
  gl.attachShader(program, frag);
  gl.linkProgram(program);
  gl.useProgram(program);

  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.drawArrays(gl.POINTS, 0, 1);

  gl.flush();
  gl.endFrameEXP();
}

export default function CameraGl() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text> what </Text>
      <GLView
        style={{ width: 300, height: 300 }}
        onContextCreate={onContextCreate}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 100,
  },
});
