import { SERVER_URL } from '../consts/consts';

export async function get_inference(filepath) {
    const res = await fetch(`${SERVER_URL}/bard/file?filepath=${filepath}`);
    return await res.json();
}

export async function upload_file(formData) {
    const res = await fetch(`${SERVER_URL}/file/upload`, {
        method: 'POST',
        body: formData
    });
    return await res.json();
}

export function get_server_file_path(filename) {
    return `${SERVER_URL}/file?filepath=${filename}`;
}