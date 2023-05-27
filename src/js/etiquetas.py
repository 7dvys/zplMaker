    def create_zpl(self,data):
        zpl_code=''
        l=0
        len(data)
        try:
            for e in data:
                code = e

                print(len(range(data[e][0])))
                # '0'*(8 - len(str(e)))+str(e)
                for label in range(data[e][0]):
                    if(l==0):
                        zpl_code+="^XA\n^MD10\n^PR4\n^MTD\n^LH0,0\n^PW720\n^LL240\n"
                        zpl_code+=f"^FO-50,40^A0N,20,20^FD{data[code][1]}^FS\n"
                        zpl_code+=f"^FO-50,70^BY2^BCN,120,Y,N,N^FD{code}^FS \n"

                        l+=1
                    else:
                        zpl_code+=f"^FO440,40^A0N,20,20^FD{data[code][1]}^FS\n"
                        zpl_code+=f"^FO440,70^BY2^BCN,120,Y,N,N^FD{code}^FS \n"
                        zpl_code+="^XZ \n"
                        l=0
            if (l==1):
                zpl_code+="^XZ \n"
            return zpl_code
        except Exception as e:
            return 'error interno'

    def format_ml_zpl(self,zpl):
        instruccion_nueva = "^PR4\n^MTD\n^LH0,0\n^PW1000\n^LL1900\n"

        zpl_dividido = zpl.split("^XA")

        for i, seccion in enumerate(zpl_dividido):
            if i != 0:
                zpl_dividido[i] = "^XA \n" + instruccion_nueva + seccion

        nuevo_zpl = "".join(zpl_dividido)

        return nuevo_zpl