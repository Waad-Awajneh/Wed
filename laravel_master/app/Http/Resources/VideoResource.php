<?php

namespace App\Http\Resources;

use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Resources\Json\JsonResource;

class VideoResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {

        // dd($request);







        // $path = $this->path;

        // // Read the file contents
        // // $contents = Storage::get($path);

        // // Return the file to the user
        // // return response($contents)
        // //     ->header('Content-Type', 'video/mp4');


        // // return ["videoPath" =>  $contents];
        // // return ["videoPath" => $this->path];
        // //  'url' => url('/') . '/videos/' . $this->path,
        return [
            "videoPath" => $this->path,
            "video_id" => $this->id

        ];
        // // return parent::toArray($request);
    }
}
