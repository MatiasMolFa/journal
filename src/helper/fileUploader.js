
export const postFileUpload = async( file ) => {
    if( !file ) throw new Error('No tenemos ningun archivo a subir.')
    const cloudURL = 'https://api.cloudinary.com/v1_1/dn8k7hgrf/upload'

    const bodyData = new FormData()

    bodyData.append('upload_preset','journal')
    bodyData.append('file', file)

    console.log(bodyData);

    try{
        const resp = await fetch( cloudURL, {
            method: 'POST',
            body: bodyData
        })

        if( !resp.ok ) throw new Error('No fue posible subir el archivo')

        const cloudResp = await resp.json()
        return cloudResp
    } catch(error){
        throw new Error(error.message)
    }

}