varying vec2 v_texCoord;
           uniform float u_radius;

          void main()
         {
             float radius = u_radius;
            vec2 coord = v_texCoord;
             coord.x += (sin(coord.y * 8.0 * 3.1415926 + radius*3.1415926 *1000.0) / 30.0  )   ;
             vec2 uvs = coord.xy;\n" +
             gl_FragColor = texture2D(CC_Texture0, coord);
          }