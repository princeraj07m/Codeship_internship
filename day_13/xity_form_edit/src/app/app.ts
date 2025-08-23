import {
  HttpClient,
  HttpEvent,
  HttpEventType,
  HttpHeaders,
} from '@angular/common/http';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import {
  FormGroup,
  FormControl,
  ReactiveFormsModule,
  NgForm,
  FormBuilder,
  Validators,
  FormArray,
} from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
// import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { ErrorhandlerService } from './services/errorhandler.service';
import { MessageService } from 'primeng/api';
import { Location } from '@angular/common';
import { environment } from '../../environment/environment';
import {
  SearchCountryField,
  CountryISO,
  PhoneNumberFormat,
} from 'ngx-intl-tel-input';

export interface Customer {
  name: string;
  country: string;
  company: string;
  representative: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
    constructor(
    private modalService: NgbModal,
    private router: Router,
    private errorhandler: ErrorhandlerService,
    private http: HttpClient,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private fb: FormBuilder,
    private messageService: MessageService,
    private location: Location
  ) {
      this.fetchCountries();
    this.route.params.subscribe((params) => {
      this.pid = params['id'];
      this.uid = params['uid'];
      
      // Safely load user data from localStorage
      try {
        const userData = localStorage.getItem('user') || this.uid || this.userdata?._id;
        if (userData) {
          this.userdata = JSON.parse(userData);
          this.token = this.userdata?.token || '';
          this.role = this.userdata?.role || '';
        } else {
          console.warn('No user data found in localStorage');
          this.userdata = null;
          this.token = '';
          this.role = '';
        }
      } catch (error) {
        console.error('Error parsing user data from localStorage:', error);
        this.userdata = null;
        this.token = '';
        this.role = '';
      }
      
      // If uid is not in route params, use userdata.uid as fallback
      if (!this.uid && this.userdata && this.userdata.uid) {
        this.uid = this.userdata.uid;
      }
      
      // Only fetch data if we have a valid token
      if (this.token) {
        // this.fetchData();
        this.fetchupload();
        this.fetchTags();
        this.fetchCategory();
      
        this.fetchAmenities();
        this.fetchExperience();
        this.fetchAmeneties();
        this.fetchAllTags();

        this.fetch_country();
        this.fetch_state();
        this.fetch_city();
        this.fetch_pincode();

        this.fetch_primary();
        this.fetch_secondary();
        // this.fetch_tertiary();
      } else {
        console.warn('No valid token found - some API calls may fail');
      }
    });
  }
  userListings: any[] = [];
  //table data
  customers: Customer[] = [
    {
      name: 'James Butt',
      country: 'Algeria',
      company: 'Benton, John B Jr',
      representative: 'Ioni Bowcher',
    },
    {
      name: 'Josephine Darakjy',
      country: 'Egypt',
      company: 'Chanay, Jeffrey A Esq',
      representative: 'Amy Elsner',
    },
    {
      name: 'Art Venere',
      country: 'Panama',
      company: 'Chemel, James L Cpa',
      representative: 'Asiya Javayant',
    },
    {
      name: 'Lenna Paprocki',
      country: 'Slovenia',
      company: 'Feltz Printing Service',
      representative: 'Xuxue Feng',
    },
    {
      name: 'Donette Foller',
      country: 'South Africa',
      company: 'Printing Dimensions',
      representative: 'Asiya Javayant',
    },
  ];
  //
  faq_url: string = environment.baseurl + '/listing-faq';
  mediaurl = environment.baseurl + '/media';
  userUrl = environment.baseurl + '/user';
  baseurl = environment.baseurl + '/listing-frontend';
  categoryurl = environment.baseurl + '/category';
  primary_cat_url = environment.baseurl + '/primary-category';
  secondary_cat_url = environment.baseurl + '/secondary-category';
  xityUrl = environment.baseurl;
  tagsurl = environment.baseurl + '/tags';
  pincode_url = environment.baseurl + '/pincode';
  city_url = environment.baseurl + '/city';
  state_url = environment.baseurl + '/state';
  country_url = environment.baseurl + '/country';
  ameities_url = environment.baseurl + '/amentities';
  experience_url = environment.baseurl + '/experience';
  tertiary_url = environment.baseurl + '/tertiary';
  main_cat_url = environment.baseurl + '/category';
  secondary_category_url = environment.baseurl + '/secondary-category';

  @ViewChild('media', { static: true }) media: TemplateRef<any>;
  @ViewChild('variablemodal', { static: true }) variablemodal: TemplateRef<any>;
  @ViewChild('benefitsmodal', { static: true }) benefitsmodal: TemplateRef<any>;
  @ViewChild('editvariablemodal', { static: true })
  editvariablemodal: TemplateRef<any>;
  @ViewChild('addteam', { static: true }) addteam: TemplateRef<any>;

  @ViewChild('editbenefitsmodal', { static: true })
  editbenefitsmodal: TemplateRef<any>;

  userdata: any = [];
  token: String = '';

  listing_id: string = '';

  categorylist: any;
  files: any[] = [];
  isHovering: boolean;

  uploadedfiles: any[] = [];
  progress: number;

  serverfiles: any[] = [];
  pid: any;
  medialist: any[] = [];

  config: any = {
    height: 250,
    toolbar:
      'formatselect | bold italic strikethrough forecolor backcolor | link | alignleft aligncenter alignright alignjustify  | numlist bullist outdent indent  | removeformat',
    plugins: ['link', 'paste', 'table'],
  };
  medialength: number = 0;
  benefitslist: any;
  imageslength: any;
  imagearray: any;
  bannermodel: any;
  selectedimages: any;
  showimg: boolean;
  productbg: any;
  bottombg: any;
  image: any;
  productdata: any = {};
  productCategory: any = [];

  dtTrigger: Subject<any> = new Subject<any>();

  faq_data: any = [];

  title: any = '';
  description: any = '';

  name: any = '';
  designation: any = '';
  type: any = '';
  benefitimg: any;
  editingdata: any;
  placement: any;
  tagslist: any;

  sku: any;
  weight: any;
  weight_unit: any;
  length: any;
  width: any;
  height: any;
  dimenssion_unit: any;
  track_inventory: any;
  quantity: any;
  listing_data: any;
  country_list: any;
  state_list: any;
  listingdata: any = {};
  city_list: any;
  pincode_list: any;
  amentities_list: any;
  experience_list: any;
  secondary_categorylist: any;
  primary_category_lilst: any;
  uid: any;
  role: any;
  amanetiesArray: any = [];
  tagsArray: any = [];
  col: any;


  ngOnInit(): void {
    if (this.pid != null) {
      this.getSingleListing();
    }
    // Add all fetch requests here for consistent initialization
    this.fetchUserListings();
    this.fetchCountries();
    this.getCategories();
    this.getSubCategories();
    this.getPincodeList();
    this.getAgents();
    this.product_category();
    // this.fetchSecondaryCat();
    // Additional fetch requests from constructor
    // this.fetchData();
    this.fetchupload();
    this.fetchTags();
    this.fetchCategory();
    this.fetchAmenities();
    this.fetchExperience();
    if (typeof this.fetchAmeneties === 'function') this.fetchAmeneties();
    if (typeof this.fetchAllTags === 'function') this.fetchAllTags();
    this.fetch_country();
    this.fetch_state();
    this.fetch_city();
    this.fetch_pincode();
    if (typeof this.fetch_primary === 'function') this.fetch_primary();
    if (typeof this.fetch_secondary === 'function') this.fetch_secondary();
    // faq will be fetched after getSingleListing() sets listing_id
  }

  goBack() {
    this.location.back();
  }
  showSuccess() {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Data posted Succesfully',
    });
  }
  showError() {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Some error occured',
    });
  }
  fetchCategory() {
    Swal.showLoading(Swal.getDenyButton());
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST',
        Authorization: 'Bearer ' + this.token,
      }),
    };

    this.http.get(this.categoryurl, httpOptions).subscribe(
      (res: any) => {
        this.categorylist = res;
        // console.log(this.categorylist);
        Swal.close();
        //console.log(this.ainlist);
      },
      (err) => {
        //console.log(err);
      }
    );
  }

  fetchPrimary() {
    Swal.showLoading(Swal.getDenyButton());
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST',
        Authorization: 'Bearer ' + this.token,
      }),
    };

    this.http.get(this.primary_cat_url, httpOptions).subscribe(
      (res: any) => {
        this.primary_category_lilst = res;
        console.log(this.primary_category_lilst);
        Swal.close();
        //console.log(this.ainlist);
      },
      (err) => {
        //console.log(err);
      }
    );
  }

  fetchSecondary() {
    Swal.showLoading(Swal.getDenyButton());
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST',
        Authorization: 'Bearer ' + this.token,
      }),
    };

    this.http.get(this.secondary_cat_url, httpOptions).subscribe(
      (res: any) => {
        this.secondary_categorylist = res;
        console.log(this.secondary_categorylist);
        Swal.close();
        //console.log(this.ainlist);
      },
      (err) => {
        //console.log(err);
      }
    );
  }

  fetchExperience() {
    Swal.showLoading(Swal.getDenyButton());
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST',
        Authorization: 'Bearer ' + this.token,
      }),
    };

    this.http.get(this.experience_url, httpOptions).subscribe(
      (res: any) => {
        this.experience_list = res;
        console.log(this.experience_list);
        Swal.close();
        //console.log(this.ainlist);
      },
      (err) => {
        //console.log(err);
      }
    );
  }

  fetchAmenities() {
    Swal.showLoading(Swal.getDenyButton());
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST',
        Authorization: 'Bearer ' + this.token,
      }),
    };

    this.http.get(this.ameities_url, httpOptions).subscribe(
      (res: any) => {
        this.amentities_list = res;
        console.log(this.amentities_list);
        Swal.close();
        //console.log(this.ainlist);
      },
      (err) => {
        //console.log(err);
      }
    );
  }

  fetchTags() {
    Swal.showLoading(Swal.getDenyButton());
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST',
        Authorization: 'Bearer ' + this.token,
      }),
    };

    this.http.get(this.tagsurl, httpOptions).subscribe(
      (res: any) => {
        this.tagslist = res;
        Swal.close();
        //console.log(this.ainlist);
      },
      (err) => {
        //console.log(err);
      }
    );
  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'PUT',
    }),
  };

  fetch_country() {
    this.http.get(this.country_url, this.httpOptions).subscribe(
      (res: any) => {
        this.country_list = res;
      },
      (err) => {}
    );
  }

  fetch_state() {
    this.http.get(this.state_url + '/', this.httpOptions).subscribe(
      (res: any) => {
        this.state_list = res;
      },
      (err) => {
        //console.log(err);
      }
    );
  }

  fetch_city() {
    this.http.get(this.city_url + '/', this.httpOptions).subscribe(
      (res: any) => {
        this.city_list = res;
      },
      (err) => {}
    );
  }

  fetch_pincode() {
    this.http.get(this.pincode_url + '/', this.httpOptions).subscribe(
      (res: any) => {
        this.pincode_list = res;
      },
      (err) => {
        //console.log(err);
      }
    );
  }

  fetchCountries() {
    Swal.showLoading(Swal.getDenyButton());
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST',
        Authorization: 'Bearer ' + this.token,
      }),
    };

    this.http.get(this.country_url, httpOptions).subscribe(
      (res: any) => {
        this.country_list = res;
        console.log(this.country_list);
        Swal.close();
      },
      (err) => {
        //console.log(err);
      }
    );
    console.log('country list ', this.country_list); //country list
  }

  fetchState() {
    Swal.showLoading(Swal.getDenyButton());
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST',
        Authorization: 'Bearer ' + this.token,
      }),
    };

    this.http
      .post(
        this.state_url + '/bycountry',
        {
          country: this.listingdata.country,
        },
        httpOptions
      )
      .subscribe(
        (res: any) => {
          console.log(this.listingdata.country);
          this.state_list = res;
          Swal.close();
        },
        (err) => {
          console.log(err);
        }
      );
  }

  fetchCity() {
    Swal.showLoading(Swal.getDenyButton());
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST',
        Authorization: 'Bearer ' + this.token,
      }),
    };

    this.http
      .post(
        this.city_url + '/bycountry',
        {
          country: this.listingdata.country,
          state: this.listingdata.state,
        },
        httpOptions
      )
      .subscribe(
        (res: any) => {
          this.city_list = res;
          Swal.close();
        },
        (err) => {
          //console.log(err);
        }
      );
  }
  fetchPincodes() {
    Swal.showLoading(Swal.getDenyButton());
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST',
        Authorization: 'Bearer ' + this.token,
      }),
    };

    this.http
      .post(
        this.pincode_url + '/bystate',
        {
          country: this.listingdata.country,
          state: this.listingdata.state,
          city: this.listingdata.city,
        },
        httpOptions
      )
      .subscribe(
        (res: any) => {
          this.pincode_list = res;
          Swal.close();
        },
        (err) => {
          //console.log(err);
        }
      );
  }
  // visible: boolean = false;
  //   toggleBestseller(data: any) {
  //     // Add logic to update the bestseller status in your backend if necessary
  //    console.log(data)
  //   }
  updateData(form) {
    Swal.showLoading(Swal.getDenyButton());
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'PUT',
        Authorization: 'Bearer ' + this.token,
      }),
    };

    this.listingdata.image = this.image;
    this.listingdata.uid = this.uid;

    // Always ensure pid is set before update
    let idFromForm = this.detailForm.get('_id')?.value;
    let idFromListing = this.listingdata._id;
    if (!this.pid) {
      this.pid = idFromForm || idFromListing;
    }
    // If still not set, try to get from listingdata after patch
    if (!this.pid && this.listingdata && this.listingdata._id) {
      this.pid = this.listingdata._id;
    }
    // Log pid for debugging
    console.log('Update Listing: pid =', this.pid);
    if (!this.pid) {
      Swal.close();
      Swal.fire('Error', 'Listing ID is missing. Cannot update.', 'error');
      return;
    }

 
      this.http.put(this.baseurl, this.listingdata, httpOptions)
      .subscribe(
        (res: any) => {
          console.log(res);
          Swal.close();
          this.modalService.dismissAll();

          Swal.fire({
            position: 'top',
            icon: 'success',
            title: 'Updated Successfully',
            showConfirmButton: false,
            timer: 1500,
          });
          this.modalService.dismissAll();
          this.router.navigate(['/listings']);
        },
        (err) => {
          Swal.close();
          let message = this.errorhandler.handleError(err);
          Swal.fire('Error', '' + message, 'error');
        }
      );
  }

  // fetchData() {
  //   Swal.showLoading(Swal.getDenyButton());
  //   const httpOptions = {
  //     headers: new HttpHeaders({
  //       'Content-Type': 'application/json',
  //       'Access-Control-Allow-Origin': '*',
  //       'Access-Control-Allow-Methods': 'POST',
  //       Authorization: 'Bearer ' + this.token,
  //     }),
  //   };

  //   this.http
  //     .get(this.baseurl + '/findoneadmin?id=' + this.pid, httpOptions)
  //     .subscribe(
  //       (res: any) => {
  //         this.listingdata = res;
  //         this.image = this.listingdata.image;
  //         this.productbg = this.listingdata.productbg;
  //         this.bottombg = this.listingdata.bottombg;
  //         // Patch all form values with the fetched listing data
  //         if (res) {
  //           // Normalize nested objects to primitive values for patchValue
  //           const patchObj = { ...res };
  //           // If the form expects a string or primitive, but the API returns an object, extract the value
  //           if (patchObj.listingDataCity && typeof patchObj.listingDataCity === 'object' && patchObj.listingDataCity._id) {
  //             patchObj.listingDataCity = patchObj.listingDataCity._id;
  //           }
  //           if (patchObj.listingDataPincode && typeof patchObj.listingDataPincode === 'object' && patchObj.listingDataPincode._id) {
  //             patchObj.listingDataPincode = patchObj.listingDataPincode._id;
  //           }
  //           // Patch the form with normalized data
  //           this.detailForm.patchValue(patchObj);
  //           // Patch FormArrays if present in response
  //           const patchArray = (formArray, values, createFn) => {
  //             formArray.clear();
  //             if (Array.isArray(values) && values.length > 0) {
  //               values.forEach(() => formArray.push(createFn()));
  //               formArray.patchValue(values);
  //             }
  //           };
  //           patchArray(this.announcement, res.announcement, this.announcementForm.bind(this));
  //           patchArray(this.team, res.team, this.teamForm.bind(this));
  //           patchArray(this.slider, res.slider, this.sliderForm.bind(this));
  //           patchArray(this.allHighlightedProducts, res.allHighlightedProducts, this.allHighlightedProductsForm.bind(this));
  //           patchArray(this.Licenses, res.Licenses, this.LicensesForm.bind(this));
  //           patchArray(this.Awards, res.Awards, this.AwardsForm.bind(this));
  //           patchArray(this.Certifications, res.Certifications, this.CertificationsForm.bind(this));
  //           patchArray(this.ContactAddress, res.ContactAddress, this.ContactAddressForm.bind(this));
  //           patchArray(this.ContactPhone, res.ContactPhone, this.ContactPhoneForm.bind(this));
  //           patchArray(this.ContactTollNo, res.ContactTollNo, this.ContactTollNoForm.bind(this));
  //           patchArray(this.OtherLinksSite, res.OtherLinksSite, this.OtherLinksSiteForm.bind(this));
  //           patchArray(this.OtherLinksWEB, res.OtherLinksWEB, this.OtherLinksWEBForm.bind(this));
  //           patchArray(this.GalleryPhotos, res.GalleryPhotos, this.GalleryPhotosForm.bind(this));
  //           patchArray(this.funFacts, res.funFacts, this.funFactForm.bind(this));
  //           patchArray(this.timeline, res.timeline, this.timelineForm.bind(this));
  //           patchArray(this.selectedSpecialitiesName, res.selectedSpecialitiesName, this.specialityForm.bind(this));
  //           patchArray(this.Services, res.Services, this.ServicesForm.bind(this));
  //         }
  //         console.log(this.listingdata);
  //         Swal.close();
  //       },
  //       (err) => {
  //         //console.log(err);
  //       }
  //     );
  // }

  refreshupload(event) {
    console.log('event');
  }

  toggleHover(event: any) {
    this.isHovering = event;
  }

  upload(e: any) {
    const fileListAsArray = Array.from(e);
    fileListAsArray.forEach((item, i) => {
      this.files.push(item);
    });
    this.uploaddata();
  }

  fetchupload() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST',
        Authorization: 'Bearer ' + this.token,
      }),
    };

    this.http
      .get(this.mediaurl + '/byproduct?id=' + this.pid, httpOptions)
      .subscribe(
        (res: any) => {
          this.medialist = res;
          this.medialength = this.medialist.length;
        },
        (err) => {
          Swal.close();
          let message = this.errorhandler.handleError(err);
          Swal.fire('Error', '' + message, 'error');
        }
      );
  }

  onDrop(files: any) {
    console.log('hovered');
    for (let i = 0; i < files.length; i++) {
      this.files.push(files.item(i));
    }
    this.uploaddata();
  }

  uploaddata() {
    this.uploadedfiles = [];
    for (let i = 0; i < this.files.length; i++) {
      this.uploadedfiles.push({
        path: URL.createObjectURL(this.files[i]),
        name: this.files[i].name,
      });

      var formData: any = new FormData();
      formData.append('file', this.files[i]);
      formData.append('pid', this.pid);
      this.http
        .post(this.baseurl, formData, {
          reportProgress: true,
          observe: 'events',
        })
        .subscribe((event: HttpEvent<any>) => {
          switch (event.type) {
            case HttpEventType.Sent:
              break;
            case HttpEventType.ResponseHeader:
              break;
            case HttpEventType.UploadProgress:
              this.progress = Math.round((event.loaded / event.total) * 100);
              break;
            case HttpEventType.Response:
              setTimeout(() => {
                this.fetchupload();
                this.progress = 0;
              }, 1000);

              console.log(event.body);
          }
        });
    }

    console.log(this.uploadedfiles);
  }

  sanitize(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  deleteFile(file) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'DELETE',
        Authorization: 'Bearer ' + this.token,
      }),
    };

    this.http.delete(this.mediaurl + '?id=' + file.id, httpOptions).subscribe(
      (res: any) => {
        //console.log(res);
        this.fetchupload();
      },
      (err) => {
        Swal.fire('Error!', err, 'warning');
      }
    );
  }

  launchBenefitmodel() {
    this.modalService.open(this.benefitsmodal, { size: 'lg' });
  }

  launchVariable() {
    this.modalService.open(this.variablemodal, { size: 'lg' });
  }

  editBenefits(data) {
    this.editingdata = data;
    this.benefitimg = this.editingdata.image;
    this.modalService.open(this.editbenefitsmodal, { size: 'lg' });
  }
  //dummy model
  @ViewChild('simpleModal') simpleModal!: TemplateRef<any>;
  showSimpleModal() {
    this.modalService.open(this.simpleModal, { size: 'ld' });
  }

  // launchmedia(query)
  launchmedia(query) {
    console.log('media template:', this.media);

    this.bannermodel = this.modalService.open(this.media, { size: 'xl' });
    this.bannermodel.result
      .then
      // (data) => {
      //   eval(query);
      // },
      // (error) => {

      // }
      ();
  }
  openmodal() {
    console.log('Opening media modal:', this.media);
    this.bannermodel = this.modalService.open(this.media, { size: 'xl' });
  }

  getSelectedImgs(event) {
    this.selectedimages = event;
    console.log(event);
    this.bannermodel.close();
  }

  createTeams() {
    this.modalService.open(this.addteam, { size: 'lg' });
  }

  createTeamList(form) {}

  Categories: any[] = [
    { id: 1, name: 'Elevator in building' },
    { id: 2, name: 'Free Wifi' },
    { id: 3, name: 'Free Parking' },
    { id: 4, name: 'Air Conditioned' },
    { id: 5, name: 'Online Ordering' },
    { id: 6, name: 'Pet Friendly' },
  ];
  Ameneties: any[] = [
    { id: 1, name: 'Elevator in building' },
    { id: 2, name: 'Free Wifi' },
    { id: 3, name: 'Free Parking' },
    { id: 4, name: 'Air Conditioned' },
    { id: 5, name: 'Online Ordering' },
    { id: 6, name: 'Pet Friendly' },
  ];
  MainCategories: any[] = [
    { id: 1, name: 'Elevator in building' },
    { id: 2, name: 'Free Wifi' },
    { id: 3, name: 'Free Parking' },
    { id: 4, name: 'Air Conditioned' },
    { id: 5, name: 'Online Ordering' },
    { id: 6, name: 'Pet Friendly' },
  ];
  SubCategories: any[] = [
    { id: 1, name: 'Elevator in building' },
    { id: 2, name: 'Free Wifi' },
    { id: 3, name: 'Free Parking' },
    { id: 4, name: 'Air Conditioned' },
    { id: 5, name: 'Online Ordering' },
    { id: 6, name: 'Pet Friendly' },
  ];
  Specialities: any[] = [
    { id: 1, name: 'speciality1' },
    { id: 2, name: 'speciality2' },
    { id: 3, name: 'speciality3' },
    { id: 4, name: 'speciality4' },
    { id: 5, name: 'speciality5' },
    { id: 6, name: 'speciality6' },
  ];
  SiteFeatures: any[] = [
    { id: 1, name: '1' },
    { id: 2, name: '2' },
    { id: 3, name: '3' },
    { id: 4, name: '4' },
    { id: 5, name: '5' },
    { id: 6, name: '6' },
  ];
  SiteServices: any[] = [
    { id: 1, name: '1' },
    { id: 2, name: '2' },
    { id: 3, name: '3' },
    { id: 4, name: '4' },
    { id: 5, name: '5' },
    { id: 6, name: '6' },
  ];
  LocationTags: any[] = [
    { id: 1, name: '1' },
    { id: 2, name: '2' },
    { id: 3, name: '3' },
    { id: 4, name: '4' },
    { id: 5, name: '5' },
    { id: 6, name: '6' },
  ];
  ServicesTags: any[] = [
    { id: 1, name: '1' },
    { id: 2, name: '2' },
    { id: 3, name: '3' },
    { id: 4, name: '4' },
    { id: 5, name: '5' },
    { id: 6, name: '6' },
  ];
  ProductsTags: any[] = [
    { id: 1, name: '1' },
    { id: 2, name: '2' },
    { id: 3, name: '3' },
    { id: 4, name: '4' },
    { id: 5, name: '5' },
    { id: 6, name: '6' },
  ];
  BrandTags: any[] = [
    { id: 1, name: '1' },
    { id: 2, name: '2' },
    { id: 3, name: '3' },
    { id: 4, name: '4' },
    { id: 5, name: '5' },
    { id: 6, name: '6' },
  ];

  service_list: any = [];

  fetch_service() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST',
        Authorization: 'Bearer ' + this.token,
      }),
    };

    this.http
      .get(
        this.tertiary_url +
          '/by-secondary?secondary=' +
          this.detailForm.controls['relatedSecondaryCategories'].value,
        httpOptions
      )
      .subscribe(
        (res: any) => {
          this.service_list = res;
        },
        (err) => {}
      );
  }

  PhoneNumberFormat = PhoneNumberFormat;
  preferredCountries: CountryISO[] = [
    CountryISO.UnitedStates,
    CountryISO.UnitedKingdom,
  ];
  separateDialCode = false;
  SearchCountryField = SearchCountryField;
  CountryISO = CountryISO;

  detailForm = this.fb.group({
    announcement: this.fb.array([this.announcementForm()]),
    is_store: new FormControl(null),
    service_provided: new FormControl(null),
    agent: new FormControl(null, [, Validators.pattern('[a-zA-Z0-9 ]*')]),
    BannerImage: new FormControl(null),
    displayImage: new FormControl(null),
    site_audio: new FormControl(null),
    BannerText: new FormControl(null, [, Validators.pattern('[a-zA-Z ]*')]),
    pincodeForListing: new FormControl(null),
    selectedAmenetiesName: new FormControl(null),
    selectedSpecialitiesName: this.fb.array([this.specialityForm()]),
    selectedLocationTagsName: new FormControl(null),
    selectedServicesTagsName: new FormControl(null),
    selectedProductsTagsName: new FormControl(null),
    selectedBrandTagsName: new FormControl(null),
    Placeimage: new FormControl(null),
    TypeofPlace: new FormControl(null),
    AboutPlace: new FormControl(null),
    featured: new FormControl(null, [, Validators.pattern('[a-zA-Z0-9 ]*')]),
    verified: new FormControl(null, [, Validators.pattern('[a-zA-Z0-9 ]*')]),
    recommended: new FormControl(null, [, Validators.pattern('[a-zA-Z0-9 ]*')]),
    Placedistance: new FormControl(null, [, Validators.pattern('[0-9]*')]),
    review: new FormControl(null),
    Numberofreviews: new FormControl(null),
    relatedCategory: new FormControl(null),
    owner: new FormControl(null, [, Validators.pattern('[a-zA-Z0-9 ]*')]),
    whetheropen: new FormControl(null, [, Validators.pattern('[a-zA-Z0-9 ]*')]),
    viewed: new FormControl(null),
    bookmarks: new FormControl(null),
    Brochure1: new FormControl(null),
    Brochure2: new FormControl(null),
    Brochure3: new FormControl(null),
    team: this.fb.array([this.teamForm()]),
    messages: new FormControl(null),
    appontments: new FormControl(null),
    orders: new FormControl(null),
    slider: this.fb.array([this.sliderForm()]),
    allHighlightedProducts: this.fb.array([this.allHighlightedProductsForm()]),
    CatalogueallHighlightedProducts: new FormControl(null),
    Licenses: this.fb.array([this.LicensesForm()]),
    Awards: this.fb.array([this.AwardsForm()]),
    Certifications: this.fb.array([this.CertificationsForm()]),
    representativeName: new FormControl(null),
    representativeImage: new FormControl(null),
    representativeHostedPlace: new FormControl(null),
    representativeStatus: new FormControl(null),
    representativeCreatedDate: new FormControl(null),
    representativeApprovedDate: new FormControl(null),
    representativeManagedDate: new FormControl(null),
    ContactAddress: this.fb.array([this.ContactAddressForm()]),
    ContactPhone: this.fb.array([this.ContactPhoneForm()]),
    ContactTollNo: this.fb.array([this.ContactTollNoForm()]),
    ContactMail: new FormControl(null),
    ContactWebsite: new FormControl(null),
    OtherLinksSite: this.fb.array([this.OtherLinksSiteForm()]),
    OtherLinksWEB: this.fb.array([this.OtherLinksWEBForm()]),
    GalleryPhotos: this.fb.array([this.GalleryPhotosForm()]),
    qrImage1: new FormControl(null),
    service_name1: new FormControl(null, [
      ,
      Validators.pattern("[a-zA-Z0-9,' ]*"),
    ]),
    business_name1: new FormControl(null, [
      ,
      Validators.pattern("[a-zA-Z0-9,' ]*"),
    ]),
    qrImage2: new FormControl(null),
    service_name2: new FormControl(null, [
      ,
      Validators.pattern("[a-zA-Z0-9,' ]*"),
    ]),
    business_name2: new FormControl(null, [
      ,
      Validators.pattern("[a-zA-Z0-9,' ]*"),
    ]),
    qrImage3: new FormControl(null),
    service_name3: new FormControl(null, [
      ,
      Validators.pattern("[a-zA-Z0-9,' ]*"),
    ]),
    business_name3: new FormControl(null, [
      ,
      Validators.pattern("[a-zA-Z0-9,' ]*"),
    ]),
    qrImage4: new FormControl(null),
    service_name4: new FormControl(null, [
      ,
      Validators.pattern("[a-zA-Z0-9,' ]*"),
    ]),
    business_name4: new FormControl(null, [
      ,
      Validators.pattern("[a-zA-Z0-9,' ]*"),
    ]),
    upiId1: new FormControl(null),
    upiBusinessName1: new FormControl(null, [
      ,
      Validators.pattern('[a-zA-Z0-9]*'),
    ]),
    upiId2: new FormControl(null),
    upiBusinessName2: new FormControl(null, [
      ,
      Validators.pattern('[a-zA-Z0-9]*'),
    ]),
    upiId3: new FormControl(null),
    upiBusinessName3: new FormControl(null, [
      ,
      Validators.pattern('[a-zA-Z0-9]*'),
    ]),
    upiId4: new FormControl(null),
    upiBusinessName4: new FormControl(null, [
      ,
      Validators.pattern('[a-zA-Z0-9]*'),
    ]),
    statisticsViews: new FormControl(null),
    statisticsBookmarks: new FormControl(null),
    statisticsSubscribers: new FormControl(null),
    statisticsMessages: new FormControl(null),
    statisticsReviews: new FormControl(null),
    statisticsProductBooking: new FormControl(null),
    statisticsAppointmentBooking: new FormControl(null),
    statisticsGalleryItems: new FormControl(null),
    relatedMainCategories: new FormControl(null),
    relatedPrimaryCategory: new FormControl(null),
    relatedSecondaryCategories: new FormControl(null),
    relatedTertiaryCategories: new FormControl(null),
    yearEstablished: new FormControl(null),
    gstIn: new FormControl(null),
    messageContent: new FormControl(null, [
      ,
      Validators.pattern("[a-zA-Z0-9,' ]*"),
    ]),
    timelineContent: new FormControl(null, [
      ,
      Validators.pattern("[a-zA-Z0-9,' ]*"),
    ]),
    funFactsContent: new FormControl(null, [
      ,
      Validators.pattern("[a-zA-Z0-9,' ]*"),
    ]),
    qrCodeImageOverview: new FormControl(null),
    aboutContent: new FormControl(null, [
      ,
      Validators.pattern("[a-zA-Z0-9,' ]*"),
    ]),
    created_almanac: new FormControl(null),
    verified_almanac: new FormControl(null),
    founded_almanac: new FormControl(null),
    yearUpdated_almanac: new FormControl(null),
    yearIncorporated_almanac: new FormControl(null),
    employees_almanac: new FormControl(null),
    branches_almanac: new FormControl(null),
    annualRevenue_almanac: new FormControl(null),
    loctionType_almanac: new FormControl(null),
    aka_almanac: new FormControl(null),
    qrCodeForProducts: new FormControl(null),
    facebookLink: new FormControl(null),
    instagramLink: new FormControl(null),
    pinterestLink: new FormControl(null),
    twitterLink: new FormControl(null),
    linkedInLink: new FormControl(null),
    youtubeLink: new FormControl(null),
    faqAdditionalInfo: new FormControl(null, [
      ,
      Validators.pattern("[a-zA-Z0-9.' ]*"),
    ]),
    tcAdditionalInfo: new FormControl(null),
    disclaimerAdditionalInfo: new FormControl(null),
    mondayShift1_from: new FormControl(null),
    mondayShift1_to: new FormControl(null),
    tuesdayShift1_from: new FormControl(null),
    tuesdayShift1_to: new FormControl(null),
    wednesdayShift1_from: new FormControl(null),
    wednesdayShift1_to: new FormControl(null),
    thursdayShift1_from: new FormControl(null),
    thursdayShift1_to: new FormControl(null),
    fridayShift1_from: new FormControl(null),
    fridayShift1_to: new FormControl(null),
    saturdayShift1_from: new FormControl(null),
    saturdayShift1_to: new FormControl(null),
    sundayShift1_from: new FormControl(null),
    sundayShift1_to: new FormControl(null),
    mondayShift2_from: new FormControl(null),
    mondayShift2_to: new FormControl(null),
    tuesdayShift2_from: new FormControl(null),
    tuesdayShift2_to: new FormControl(null),
    wednesdayShift2_from: new FormControl(null),
    wednesdayShift2_to: new FormControl(null),
    thursdayShift2_from: new FormControl(null),
    thursdayShift2_to: new FormControl(null),
    fridayShift2_from: new FormControl(null),
    fridayShift2_to: new FormControl(null),
    saturdayShift2_from: new FormControl(null),
    saturdayShift2_to: new FormControl(null),
    sundayShift2_from: new FormControl(null),
    sundayShift2_to: new FormControl(null),
    listingDataCountry: new FormControl(null),
    listingDataState: new FormControl(null),
    listingDataCity: new FormControl(null),
    listingDataPincode: new FormControl(null),
    averagePriceForListings: new FormControl(null),
    listing_address: new FormControl(null),
    Services: this.fb.array([this.ServicesForm()]),
    pricingCheap: new FormControl(null),
    pricingEconomical: new FormControl(null),
    pricingModerate: new FormControl(null),
    pricingExpensive: new FormControl(null),
    pricingLuxary: new FormControl(null),
    latitude: new FormControl(null),
    longitude: new FormControl(null),
    moreInfo_content: new FormControl(null),
    moreInfo_mission: new FormControl(null),
    moreInfo_vision: new FormControl(null),
    moreInfo_serve: new FormControl(null),
    moreInfo_approach: new FormControl(null),
    moreInfo_whatWeDo: new FormControl(null),
    keyFacts_projects: new FormControl(null),
    funFacts: this.fb.array([this.funFactForm()]),
    timeline: this.fb.array([this.timelineForm()]),
    //
    price_type: new FormControl(null),
    price_range_min: new FormControl(null),
    price_range_max: new FormControl(null),
    //
    discount: new FormControl(null),
  });

  funFactForm() {
    return this.fb.group({
      content: new FormControl(null),
    });
  }

  get funFacts() {
    return this.detailForm.get('funFacts') as FormArray;
  }

  funFactAdd() {
    this.funFacts.push(this.funFactForm());
  }

  timelineForm() {
    return this.fb.group({
      content: new FormControl(null),
      date: new FormControl(null),
    });
  }

  get timeline() {
    return this.detailForm.get('timeline') as FormArray;
  }

  timelineAdd() {
    this.timeline.push(this.timelineForm());
  }

  calculateAverageListingPrice() {
    this.detailForm.patchValue({
      averagePriceForListings:
        (this.detailForm.controls['pricingCheap'].value +
          this.detailForm.controls['pricingEconomical'].value +
          this.detailForm.controls['pricingModerate'].value +
          this.detailForm.controls['pricingExpensive'].value +
          this.detailForm.controls['pricingLuxary'].value) /
        5,
    });
    console.log(this.detailForm);
    console.log(this.detailForm.controls['averagePriceForListings'].value);
  }

  ServicesForm() {
    return this.fb.group({
      service: new FormControl(null),
    });
  }

  get Services() {
    return this.detailForm.get('Services') as FormArray;
  }

  ServicesAdd() {
    this.Services.push(this.ServicesForm());
  }

  //team FORM
  teamForm() {
    return this.fb.group({
      image: new FormControl(null),
      memberName: new FormControl(null, [
        Validators.required,
        Validators.pattern('[a-zA-Z ]*'),
      ]),
      memberRole: new FormControl(null, [
        Validators.required,
        Validators.pattern('[a-zA-Z ]*'),
      ]),
      memberEmail: new FormControl(null, [
        Validators.required,
        Validators.email,
      ]),
      memberContact: new FormControl(null, [
        Validators.required,
        Validators.pattern('[0-9]*'),
      ]),
      memberCategory: new FormControl(null),
    });
  }

  get team() {
    return this.detailForm.get('team') as FormArray;
  }

  teamadd() {
    this.team.push(this.teamForm());
  }

  // SLIDER IMAGE FORM
  sliderForm() {
    return this.fb.group({
      image: new FormControl(null),
    });
  }

  get slider() {
    return this.detailForm.get('slider') as FormArray;
  }

  slideradd() {
    this.slider.push(this.sliderForm());
  }

  // announcements
  announcementForm() {
    return this.fb.group({
      name: new FormControl(null),
    });
  }

  get announcement() {
    return this.detailForm.get('announcement') as FormArray;
  }

  announcementAdd() {
    this.announcement.push(this.announcementForm());
  }

  // allHighlightedProducts FORM
  allHighlightedProductsForm() {
    return this.fb.group({
      image: new FormControl(null),
      title: new FormControl(null),
      description: new FormControl(null),
      Price: new FormControl(null),
      product_category: new FormControl(null),
    });
  }

  get allHighlightedProducts() {
    return this.detailForm.get('allHighlightedProducts') as FormArray;
  }

  allHighlightedProductsadd() {
    this.allHighlightedProducts.push(this.allHighlightedProductsForm());
  }

  //
  LicensesForm() {
    return this.fb.group({
      file: new FormControl(null),
      file_name: new FormControl(null),
    });
  }

  get Licenses() {
    return this.detailForm.get('Licenses') as FormArray;
  }

  Licensesadd() {
    this.Licenses.push(this.LicensesForm());
  }

  Licenses_remove(i) {
    this.Licenses.removeAt(i);
  }

  //
  // speciality
  specialityForm() {
    return this.fb.group({
      name: new FormControl(null),
    });
  }

  get selectedSpecialitiesName() {
    return this.detailForm.get('selectedSpecialitiesName') as FormArray;
  }

  speciality_add() {
    this.selectedSpecialitiesName.push(this.specialityForm());
  }

  speciality__remove(i) {
    this.selectedSpecialitiesName.removeAt(i);
  }

  // Awards FORM
  AwardsForm() {
    return this.fb.group({
      file: new FormControl(null),
      file_name: new FormControl(null),
    });
  }

  get Awards() {
    return this.detailForm.get('Awards') as FormArray;
  }

  Awardsadd() {
    this.Awards.push(this.AwardsForm());
  }

  Awards_remove(i) {
    this.Awards.removeAt(i);
  }

  // Certifications FORM
  CertificationsForm() {
    return this.fb.group({
      file: new FormControl(null),
      file_name: new FormControl(null),
    });
  }
  get Certifications() {
    return this.detailForm.get('Certifications') as FormArray;
  }
  Certificationsadd() {
    this.Certifications.push(this.CertificationsForm());
  }

  Certifications_remove(i) {
    this.Certifications.removeAt(i);
  }

  //Nearby Form

  ContactAddressForm() {
    return this.fb.group({
      address: new FormControl(null),
    });
  }
  get ContactAddress() {
    return this.detailForm.get('ContactAddress') as FormArray;
  }
  ContactAddressadd() {
    this.ContactAddress.push(this.ContactAddressForm());
  }

  //ContactPhone Form
  ContactPhoneForm() {
    return this.fb.group({
      phone: new FormControl(null),
    });
  }
  get ContactPhone() {
    return this.detailForm.get('ContactPhone') as FormArray;
  }
  ContactPhoneadd() {
    this.ContactPhone.push(this.ContactPhoneForm());
  }

  //ContactTollNo Form
  ContactTollNoForm() {
    return this.fb.group({
      tollNo: new FormControl(null),
    });
  }
  get ContactTollNo() {
    return this.detailForm.get('ContactTollNo') as FormArray;
  }
  ContactTollNoadd() {
    this.ContactTollNo.push(this.ContactTollNoForm());
  }

  //OtherLinks Form
  OtherLinksSiteForm() {
    return this.fb.group({
      link: new FormControl(null),
    });
  }
  get OtherLinksSite() {
    return this.detailForm.get('OtherLinksSite') as FormArray;
  }
  OtherLinksSiteadd() {
    this.OtherLinksSite.push(this.OtherLinksSiteForm());
  }

  //OtherLinks WEB Form
  OtherLinksWEBForm() {
    return this.fb.group({
      link: new FormControl(null),
    });
  }
  get OtherLinksWEB() {
    return this.detailForm.get('OtherLinksWEB') as FormArray;
  }
  OtherLinksWEBadd() {
    this.OtherLinksWEB.push(this.OtherLinksWEBForm());
  }

  //GalleryPhotosForm
  GalleryPhotosForm() {
    return this.fb.group({
      image: new FormControl(null),
    });
  }
  get GalleryPhotos() {
    return this.detailForm.get('GalleryPhotos') as FormArray;
  }
  GalleryPhotosadd() {
    this.GalleryPhotos.push(this.GalleryPhotosForm());
  }

  categoryList;
  subCategoryList;
  pincodeList;
  apiUrl = environment.baseurl;
  getCategories() {
    this.http.get(this.apiUrl + '/category').subscribe((res) => {
      this.categoryList = res;
      console.log(this.categoryList);
    });
  }

  getSubCategories() {
    this.http.get(this.apiUrl + '/primary-category').subscribe((res) => {
      this.subCategoryList = res;
      console.log(this.subCategoryList);
    });
  }

  getPincodeList() {
    this.http
      .get(this.apiUrl + '/pincode/get-pincodes-list')
      .subscribe((res) => {
        this.pincodeList = res;
        console.log(this.pincodeList);
      });
  }

  agents: any = [];

  getAgents() {
    Swal.showLoading(Swal.getDenyButton());
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST',
        Authorization: 'Bearer ' + this.token,
      }),
    };

    this.http.get(this.userUrl + '/agent', httpOptions).subscribe(
      (res: any) => {
        this.agents = res;
        console.log('agents:');
        console.log(this.agents);

        //console.log(this.ainlist);
      },
      (err) => {
        //console.log(err);
      }
    );
  }

  fetchSecondaryCat() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST',
        Authorization: 'Bearer ' + this.token,
      }),
    };

    this.http
      .get(
        this.secondary_category_url +
          '/by-primary?primary=' +
          this.secondaryVal,
        httpOptions
      )
      .subscribe(
        (res: any) => {
          this.secondaryCategoryList = res;
        },
        (err) => {
          //console.log(err);
        }
      );
  }

  fetchTertiaryCat() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST',
        Authorization: 'Bearer ' + this.token,
      }),
    };

    this.http
      .get(
        this.tertiary_url + '/by-secondary?secondary=' + this.tertiaryVal,
        httpOptions
      )
      .subscribe(
        (res: any) => {
          this.tertiaryCategoryList = res;
          this.fetch_service();
        },
        (err) => {
          //console.log(err);
        }
      );
  }

  tertiaryVal: any;
  tertiaryCategoryList: any;
  secondaryVal: any;
  secondaryCategoryList: any;
  categoryValue: any;

  fetch_primary() {
    this.http
      .get(this.primary_cat_url + '/', this.httpOptions)
      .subscribe((res: any) => {
        this.subCategoryList = res;
      });
  }

  fetch_secondary() {
    this.http
      .get(this.secondary_category_url + '/', this.httpOptions)
      .subscribe((res: any) => {
        this.secondaryCategoryList = res;
      });
  }

  fetch_tertiary() {
    this.http
      .get(this.tertiary_url + '/', this.httpOptions)
      .subscribe((res: any) => {
        this.tertiaryCategoryList = res;
      });
  }

  fetchPrimaryCat() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST',
        Authorization: 'Bearer ' + this.token,
      }),
    };

    this.http
      .get(
        this.primary_cat_url + '/by-main?main=' + this.categoryValue,
        httpOptions
      )
      .subscribe(
        (res: any) => {
          this.subCategoryList = res;
        },
        (err) => {
          //console.log(err);
        }
      );
  }

  fetchMain() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST',
        Authorization: 'Bearer ' + this.token,
      }),
    };

    this.http.get(this.main_cat_url, httpOptions).subscribe(
      (res: any) => {
        this.categoryList = res;
      },
      (err) => {
        //console.log(err);
      }
    );
  }

  getSingleListing() {
    this.http
      .get(this.baseurl + '/get-single-listing-with-pid?id=' + this.pid)
      .subscribe((res: any) => {
        console.log('my res:', res);
        for (let i = 0; i < res.Awards.length - 1; i++) {
          this.Awardsadd();
        }

        for (let i = 0; i < res.team.length - 1; i++) {
          this.teamadd();
        }

        for (let i = 0; i < res.slider.length - 1; i++) {
          this.slideradd();
        }

        for (let i = 0; i < res.announcement.length - 1; i++) {
          this.announcementAdd();
        }

        for (let i = 0; i < res.allHighlightedProducts.length - 1; i++) {
          this.allHighlightedProductsadd();
        }

        for (let i = 0; i < res.Licenses.length - 1; i++) {
          this.Licensesadd();
        }

        for (let i = 0; i < res.Certifications.length - 1; i++) {
          this.Certificationsadd();
        }

        for (let i = 0; i < res.ContactAddress.length - 1; i++) {
          this.ContactAddressadd();
        }

        for (let i = 0; i < res.ContactPhone.length - 1; i++) {
          this.ContactPhoneadd();
        }

        for (let i = 0; i < res.ContactTollNo.length - 1; i++) {
          this.ContactTollNoadd();
        }

        for (let i = 0; i < res.OtherLinksSite.length - 1; i++) {
          this.OtherLinksSiteadd();
        }

        for (let i = 0; i < res.OtherLinksWEB.length - 1; i++) {
          this.OtherLinksWEBadd();
        }

        for (let i = 0; i < res.GalleryPhotos.length - 1; i++) {
          this.GalleryPhotosadd();
        }

        for (let i = 0; i < res.funFacts.length - 1; i++) {
          this.funFactAdd();
        }

        for (let i = 0; i < res.timeline.length - 1; i++) {
          this.timelineAdd();
        }

        this.detailForm.patchValue(res);

        this.listing_id = res._id;
        this.fetch_faq();
      });
  }
  formvalue() {
    console.log(this.detailForm.value);
    console.log(this.detailForm.valid);
  }

  // Debug method to check current state
  debugCurrentState() {
    console.log('=== CURRENT COMPONENT STATE ===');
    console.log('pid (route param):', this.pid);
    console.log('uid (route param):', this.uid);
    console.log('listing_id:', this.listing_id);
    console.log('userdata:', this.userdata);
    console.log('token:', this.token ? 'Present' : 'Missing');
    console.log('role:', this.role);
    console.log('baseurl:', this.baseurl);
    console.log('form valid:', this.detailForm.valid);
    console.log('=================================');
  }

  // Method to safely initialize user data
  initializeUserData(): boolean {
    try {
      const userData = localStorage.getItem('user');
      if (userData) {
        this.userdata = JSON.parse(userData);
        this.token = this.userdata?.token || '';
        this.role = this.userdata?.role || '';
        
        // If uid is not set and we have userdata, use it
        if (!this.uid && this.userdata && this.userdata.uid) {
          this.uid = this.userdata.uid;
        }
        
        console.log('User data initialized successfully');
        return true;
      } else {
        console.warn('No user data found in localStorage');
        return false;
      }
    } catch (error) {
      console.error('Error parsing user data from localStorage:', error);
      this.userdata = null;
      this.token = '';
      this.role = '';
      return false;
    }
  }

  fetchAmeneties() {
    this.http.get(this.xityUrl + '/amentities').subscribe((res: any) => {
      this.amanetiesArray = res;
      console.log('ameneties', this.amanetiesArray);
    });
  }
  fetchAllTags() {
    this.http.get(this.xityUrl + '/tags').subscribe((res: any) => {
      this.tagsArray = res;
      console.log('tags', this.amanetiesArray);
    });
  }

  audioUpload(event: any) {
    console.log(event.target.files[0]);
    var formData: any = new FormData();
    let res = formData.append(
      'file',
      (event.target as HTMLInputElement).files[0]
    );
    this.http
      .post(this.apiUrl + '/upload/video-upload', formData)
      .subscribe((res: any) => {
        console.log(res);
        this.detailForm.patchValue({ site_audio: res.filename });
      });
  }

  doc_upload(event: any, index: any, form_control: any) {
    // console.log('event -->', event, ' i -->', index);
    var formData: any = new FormData();
    let res = formData.append(
      'file',
      (event.target as HTMLInputElement).files[0]
    );
    this.http
      .post(this.apiUrl + '/upload/doc-upload', formData)
      .subscribe((res: any) => {
        const array = this.detailForm.get(form_control) as FormArray;
        const group = array.at(index) as FormGroup;
        group.patchValue({
          file: res.filename,
          file_name: res.original_filename,
        });
      });
  }

  product_category() {
    this.http.get(this.apiUrl + '/product/category').subscribe((res: any) => {
      this.productCategory = res;
    });
  }

  //
  delete_faq(id) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.showLoading(Swal.getDenyButton());
        const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'DELETE',
            Authorization: 'Bearer ' + this.token,
          }),
        };

        this.http.delete(this.faq_url + '/?id=' + id, httpOptions).subscribe(
          (res: any) => {
            Swal.close();
            Swal.fire({
              position: 'top',
              icon: 'success',
              title: 'Deleted Successfully',
              showConfirmButton: false,
              timer: 1500,
            });
            this.reFetchData();
          },
          (err) => {}
        );
      }
    });
  }

  reFetchData() {
    Swal.showLoading(Swal.getDenyButton());
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST',
        Authorization: 'Bearer ' + this.token,
      }),
    };
    this.http
      .get(this.faq_url + '?id=' + this.listing_id, httpOptions)
      .subscribe(
        (res: any) => {
          this.faq_data = res;
          // this.rerender();
          Swal.close();
          //console.log(this.ainlist);
        },
        (err) => {
          //console.log(err);
        }
      );
  }

  fetch_faq() {
    Swal.showLoading(Swal.getDenyButton());
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST',
        Authorization: 'Bearer ' + this.token,
      }),
    };

    this.http
      .get(this.faq_url + '?id=' + this.listing_id, httpOptions)
      .subscribe(
        (res: any) => {
          this.faq_data = res;
          this.dtTrigger.next(null);
          Swal.close();
        },
        (err) => {
          //console.log(err);
        }
      );
  }

  edit_faq(id: string) {
    this.router.navigate(['/faq-listing-edit', id]);
  }

  add_faq_listing() {
    this.router.navigate(['/faq-listing-add', this.listing_id]);
  }

  faq_content(id: string) {
    this.router.navigate(['/faq-listing-content', id]);
  }

  onsubmit() {
    console.log('=== MAIN FORM SUBMISSION STARTED ===');
    this.calculateAverageListingPrice();
    
    // Check if userdata exists, if not try to initialize it
    if (!this.userdata) {
      console.error('User data is null - attempting to reload from localStorage');
      if (!this.initializeUserData()) {
        Swal.fire({
          position: 'top',
          icon: 'error',
          title: 'Error: User session expired. Please login again.',
          showConfirmButton: false,
          timer: 3000,
        });
        return;
      }
    }
    
    // Use userdata.uid as fallback if this.uid is undefined
    const userId = this.userdata?._id;
    console.log('User ID for form submission:', userId);
    console.log('Route pid:', this.pid);
    console.log('Route uid:', this.uid);
    console.log('Userdata:', this.userdata);
    console.log('Userdata uid:', this.userdata?._id);
    
    // if (!userId) {
    //   console.error('No user ID available for creating listing');
    //   Swal.fire({
    //     position: 'top',
    //     icon: 'error',
    //     title: 'Error: No user ID found. Please login again.',
    //     showConfirmButton: false,
    //     timer: 3000,
    //   });
    //   return;
    // }

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST',
        Authorization: 'Bearer ' + this.token,
      }),
    };
    
    console.log('Form data to be submitted:', this.detailForm.value);
    console.log('API URL:', this.baseurl + '?id=' + userId);
    
    if (this.role == 'AGENT' && this.userdata && this.userdata.uid) {
      this.detailForm.value.agent = this.userdata.uid;
    }
    
    // Always use POST for main form submission (creating new listing)
    this.product_category();
    this.http
      .post(
        this.baseurl + '?id=' + userId,
        this.detailForm.value,
        httpOptions
      )
      .subscribe(
        (res: any) => {
          console.log('=== LISTING CREATED SUCCESSFULLY ===');
          console.log('Server response:', res);
          // Store the new listing ID for future section updates
          if (res && res._id) {
            this.listing_id = res._id;
            this.pid = res._id;
            console.log('New listing ID stored:', this.listing_id);
          }
          this.showSuccess();
          // Don't reset form anymore to allow section updates
          // this.detailForm.reset();
        },
        (error) => {
          console.error('=== ERROR CREATING LISTING ===');
          console.error('Error details:', error);
          this.showError();
        }
      );
  }

  // SECTION SAVE METHODS

// 1. Main Banner Section
saveMainBanner() {
  const data = {
    BannerImage: this.detailForm.get('BannerImage').value,
    displayImage: this.detailForm.get('displayImage').value,
    BannerText: this.detailForm.get('BannerText').value,
    site_audio: this.detailForm.get('site_audio').value,
    listingDataCountry: this.detailForm.get('listingDataCountry').value,
    listingDataState: this.detailForm.get('listingDataState').value,
    listingDataCity: this.detailForm.get('listingDataCity').value,
    listingDataPincode: this.detailForm.get('listingDataPincode').value,
    latitude: this.detailForm.get('latitude').value,
    longitude: this.detailForm.get('longitude').value,
    agent: this.detailForm.get('agent').value,
  };
  this.saveSectionData(data);
}

// 2. Details Section
saveDetailsSection() {
  const data = {
    TypeofPlace: this.detailForm.get('TypeofPlace').value,
    Placeimage: this.detailForm.get('Placeimage').value,
    AboutPlace: this.detailForm.get('AboutPlace').value,
    featured: this.detailForm.get('featured').value,
    verified: this.detailForm.get('verified').value,
    recommended: this.detailForm.get('recommended').value,
    Placedistance: this.detailForm.get('Placedistance').value,
    owner: this.detailForm.get('owner').value,
    whetheropen: this.detailForm.get('whetheropen').value,
    discount: this.detailForm.get('discount').value,
    listing_address: this.detailForm.get('listing_address').value,
  };
  this.saveSectionData(data);
}

// Fetch all listings for the current user
fetchUserListings() {
  if (!this.userdata || !this.userdata._id) {
    console.warn('No user id found for fetching listings');
    return;
  }
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.token,
    }),
  };
  this.http.get(`${this.baseurl}/listings-by-user?id=${this.userdata._id}`, httpOptions)
    .subscribe(
      (res: any) => {
        this.detailForm.patchValue(res); // Patch the form with the listing data
      this.userListings = res;
        console.log('User listings loaded:', this.userListings);
        
        localStorage.setItem('userListings', JSON.stringify(this.userListings));
        // If listings exist, pre-fill the form with the most recently updated one
        if (Array.isArray(this.userListings) && this.userListings.length > 0) {
          // Sort by updatedAt descending, fallback to createdAt if needed
          const sorted = this.userListings.sort((a, b) => {
            const dateA = new Date(a.updatedAt || a.createdAt || 0).getTime();
            const dateB = new Date(b.updatedAt || b.createdAt || 0).getTime();
            return dateB - dateA;
          });
          const latest = sorted[0];
          if (latest) {
            // Patch all FormControls
            this.detailForm.patchValue(latest);

            // Set the pid to the latest listing's _id for update operations
            if (latest._id) {
              this.pid = latest._id;
              this.listing_id = latest._id;
            }

            // Helper to patch FormArrays
            const patchArray = (formArray, values, createFn) => {
              formArray.clear();
              if (Array.isArray(values)) {
                values.forEach((v) => formArray.push(createFn()));
                formArray.patchValue(values);
              }
            };

            // Patch all FormArrays
            patchArray(this.announcement, latest.announcement, this.announcementForm.bind(this));
            patchArray(this.team, latest.team, this.teamForm.bind(this));
            patchArray(this.slider, latest.slider, this.sliderForm.bind(this));
            patchArray(this.allHighlightedProducts, latest.allHighlightedProducts, this.allHighlightedProductsForm.bind(this));
            patchArray(this.Licenses, latest.Licenses, this.LicensesForm.bind(this));
            patchArray(this.Awards, latest.Awards, this.AwardsForm.bind(this));
            patchArray(this.Certifications, latest.Certifications, this.CertificationsForm.bind(this));
            patchArray(this.ContactAddress, latest.ContactAddress, this.ContactAddressForm.bind(this));
            patchArray(this.ContactPhone, latest.ContactPhone, this.ContactPhoneForm.bind(this));
            patchArray(this.ContactTollNo, latest.ContactTollNo, this.ContactTollNoForm.bind(this));
            patchArray(this.OtherLinksSite, latest.OtherLinksSite, this.OtherLinksSiteForm.bind(this));
            patchArray(this.OtherLinksWEB, latest.OtherLinksWEB, this.OtherLinksWEBForm.bind(this));
            patchArray(this.GalleryPhotos, latest.GalleryPhotos, this.GalleryPhotosForm.bind(this));
            patchArray(this.funFacts, latest.funFacts, this.funFactForm.bind(this));
            patchArray(this.timeline, latest.timeline, this.timelineForm.bind(this));
            patchArray(this.selectedSpecialitiesName, latest.selectedSpecialitiesName, this.specialityForm.bind(this));
            patchArray(this.Services, latest.Services, this.ServicesForm.bind(this));

            console.log('Form and all FormArrays pre-filled with latest listing:', latest);
          }
        }
      },
      (err) => {
        console.error('Error fetching user listings:', err);
      }
    );
}

// 3. Categories Section
saveCategoriesSection() {
  const data = {
    relatedMainCategories: this.detailForm.get('relatedMainCategories').value,
    relatedPrimaryCategory: this.detailForm.get('relatedPrimaryCategory').value,
    relatedSecondaryCategories: this.detailForm.get('relatedSecondaryCategories').value,
    relatedTertiaryCategories: this.detailForm.get('relatedTertiaryCategories').value,
  };
  this.saveSectionData(data);
}

// 4. Tags Section
saveTagsSection() {
  const data = {
    selectedLocationTagsName: this.detailForm.get('selectedLocationTagsName').value,
    selectedServicesTagsName: this.detailForm.get('selectedServicesTagsName').value,
    selectedProductsTagsName: this.detailForm.get('selectedProductsTagsName').value,
    selectedBrandTagsName: this.detailForm.get('selectedBrandTagsName').value,
  };
  this.saveSectionData(data);
}

// 5. Service Section
saveServiceSection() {
  const data = {
    service_provided: this.detailForm.get('service_provided').value,
  };
  this.saveSectionData(data);
}

// 6. About Business Section
saveAboutBusinessSection() {
  const data = {
    aboutContent: this.detailForm.get('aboutContent').value,
    messageContent: this.detailForm.get('messageContent').value,
    timelineContent: this.detailForm.get('timelineContent').value,
    funFactsContent: this.detailForm.get('funFactsContent').value,
    moreInfo_content: this.detailForm.get('moreInfo_content').value,
    moreInfo_mission: this.detailForm.get('moreInfo_mission').value,
    moreInfo_vision: this.detailForm.get('moreInfo_vision').value,
    moreInfo_serve: this.detailForm.get('moreInfo_serve').value,
    moreInfo_approach: this.detailForm.get('moreInfo_approach').value,
    moreInfo_whatWeDo: this.detailForm.get('moreInfo_whatWeDo').value,
    Brochure1: this.detailForm.get('Brochure1').value,
    Brochure2: this.detailForm.get('Brochure2').value,
    Brochure3: this.detailForm.get('Brochure3').value,
    qrCodeImageOverview: this.detailForm.get('qrCodeImageOverview').value,
    yearEstablished: this.detailForm.get('yearEstablished').value,
    gstIn: this.detailForm.get('gstIn').value,
  };
  this.saveSectionData(data);
}

// 7. Team Section
saveTeamSection() {
  const data = {
    team: this.detailForm.get('team').value,
  };
  this.saveSectionData(data);
}

// 8. Slider Section
saveSliderSection() {
  const data = {
    slider: this.detailForm.get('slider').value,
  };
  this.saveSectionData(data);
}

// 9. Highlighted Products Section
saveHighlightedProductsSection() {
  const data = {
    allHighlightedProducts: this.detailForm.get('allHighlightedProducts').value,
    CatalogueallHighlightedProducts: this.detailForm.get('CatalogueallHighlightedProducts').value,
    qrCodeForProducts: this.detailForm.get('qrCodeForProducts').value,
  };
  this.saveSectionData(data);
}

// 10. Licenses Section
saveLicensesSection() {
  const data = {
    Licenses: this.detailForm.get('Licenses').value,
  };
  this.saveSectionData(data);
}

// 11. Awards Section
saveAwardsSection() {
  const data = {
    Awards: this.detailForm.get('Awards').value,
  };
  this.saveSectionData(data);
}

// 12. Certifications Section
saveCertificationsSection() {
  const data = {
    Certifications: this.detailForm.get('Certifications').value,
  };
  this.saveSectionData(data);
}

// 13. Representative Section
saveRepresentativeSection() {
  const data = {
    representativeName: this.detailForm.get('representativeName').value,
    representativeImage: this.detailForm.get('representativeImage').value,
    representativeHostedPlace: this.detailForm.get('representativeHostedPlace').value,
    representativeStatus: this.detailForm.get('representativeStatus').value,
    representativeCreatedDate: this.detailForm.get('representativeCreatedDate').value,
    representativeApprovedDate: this.detailForm.get('representativeApprovedDate').value,
    representativeManagedDate: this.detailForm.get('representativeManagedDate').value,
  };
  this.saveSectionData(data);
}

// 14. Contact Info Section
saveContactInfoSection() {
  const data = {
    ContactAddress: this.detailForm.get('ContactAddress').value,
    ContactPhone: this.detailForm.get('ContactPhone').value,
    ContactTollNo: this.detailForm.get('ContactTollNo').value,
    ContactMail: this.detailForm.get('ContactMail').value,
    ContactWebsite: this.detailForm.get('ContactWebsite').value,
    OtherLinksSite: this.detailForm.get('OtherLinksSite').value,
    OtherLinksWEB: this.detailForm.get('OtherLinksWEB').value,
  };
  this.saveSectionData(data);
}

// 15. Gallery Section
saveGallerySection() {
  const data = {
    GalleryPhotos: this.detailForm.get('GalleryPhotos').value,
  };
  this.saveSectionData(data);
}

// 16. Payment Section
savePaymentSection() {
  const data = {
    qrImage1: this.detailForm.get('qrImage1').value,
    service_name1: this.detailForm.get('service_name1').value,
    business_name1: this.detailForm.get('business_name1').value,
    qrImage2: this.detailForm.get('qrImage2').value,
    service_name2: this.detailForm.get('service_name2').value,
    business_name2: this.detailForm.get('business_name2').value,
    qrImage3: this.detailForm.get('qrImage3').value,
    service_name3: this.detailForm.get('service_name3').value,
    business_name3: this.detailForm.get('business_name3').value,
    qrImage4: this.detailForm.get('qrImage4').value,
    service_name4: this.detailForm.get('service_name4').value,
    business_name4: this.detailForm.get('business_name4').value,
    upiId1: this.detailForm.get('upiId1').value,
    upiBusinessName1: this.detailForm.get('upiBusinessName1').value,
    upiId2: this.detailForm.get('upiId2').value,
    upiBusinessName2: this.detailForm.get('upiBusinessName2').value,
    upiId3: this.detailForm.get('upiId3').value,
    upiBusinessName3: this.detailForm.get('upiBusinessName3').value,
    upiId4: this.detailForm.get('upiId4').value,
    upiBusinessName4: this.detailForm.get('upiBusinessName4').value,
  };
  this.saveSectionData(data);
}

// 17. Statistics Section
saveStatisticsSection() {
  const data = {
    statisticsViews: this.detailForm.get('statisticsViews').value,
    statisticsBookmarks: this.detailForm.get('statisticsBookmarks').value,
    statisticsSubscribers: this.detailForm.get('statisticsSubscribers').value,
    statisticsMessages: this.detailForm.get('statisticsMessages').value,
    statisticsReviews: this.detailForm.get('statisticsReviews').value,
    statisticsProductBooking: this.detailForm.get('statisticsProductBooking').value,
    statisticsAppointmentBooking: this.detailForm.get('statisticsAppointmentBooking').value,
    statisticsGalleryItems: this.detailForm.get('statisticsGalleryItems').value,
  };
  this.saveSectionData(data);
}

// 18. Additional Info Section
saveAdditionalInfoSection() {
  const data = {
    faqAdditionalInfo: this.detailForm.get('faqAdditionalInfo').value,
    tcAdditionalInfo: this.detailForm.get('tcAdditionalInfo').value,
    disclaimerAdditionalInfo: this.detailForm.get('disclaimerAdditionalInfo').value,
  };
  this.saveSectionData(data);
}

// 19. More Info Section
saveMoreInfoSection() {
  const data = {
    moreInfo_content: this.detailForm.get('moreInfo_content').value,
    moreInfo_mission: this.detailForm.get('moreInfo_mission').value,
    moreInfo_vision: this.detailForm.get('moreInfo_vision').value,
    moreInfo_serve: this.detailForm.get('moreInfo_serve').value,
    moreInfo_approach: this.detailForm.get('moreInfo_approach').value,
    moreInfo_whatWeDo: this.detailForm.get('moreInfo_whatWeDo').value,
    keyFacts_projects: this.detailForm.get('keyFacts_projects').value,
    created_almanac: this.detailForm.get('created_almanac').value,
    verified_almanac: this.detailForm.get('verified_almanac').value,
    founded_almanac: this.detailForm.get('founded_almanac').value,
    yearUpdated_almanac: this.detailForm.get('yearUpdated_almanac').value,
    yearIncorporated_almanac: this.detailForm.get('yearIncorporated_almanac').value,
    employees_almanac: this.detailForm.get('employees_almanac').value,
    branches_almanac: this.detailForm.get('branches_almanac').value,
    annualRevenue_almanac: this.detailForm.get('annualRevenue_almanac').value,
    loctionType_almanac: this.detailForm.get('loctionType_almanac').value,
    aka_almanac: this.detailForm.get('aka_almanac').value,
  };
  this.saveSectionData(data);
}

// 20. Fun Facts Section
saveFunFactsSection() {
  const data = {
    funFacts: this.detailForm.get('funFacts').value,
    funFactsContent: this.detailForm.get('funFactsContent').value,
  };
  this.saveSectionData(data);
}

// 21. Timeline Section
saveTimelineSection() {
  const data = {
    timeline: this.detailForm.get('timeline').value,
    timelineContent: this.detailForm.get('timelineContent').value,
  };
  this.saveSectionData(data);
}

// 22. Amenities Section
saveAmenitiesSection() {
  const data = {
    selectedAmenetiesName: this.detailForm.get('selectedAmenetiesName').value,
  };
  this.saveSectionData(data);
}

// 23. Specialities Section
saveSpecialitiesSection() {
  const data = {
    selectedSpecialitiesName: this.detailForm.get('selectedSpecialitiesName').value,
  };
  this.saveSectionData(data);
}

// 24. Advertisement Section
saveAdvertisementSection() {
  const data = {
    announcement: this.detailForm.get('announcement').value,
    OtherLinksSite: this.detailForm.get('OtherLinksSite').value,
    OtherLinksWEB: this.detailForm.get('OtherLinksWEB').value,
  };
  this.saveSectionData(data);
}

// 25. Our Team Section (already present as saveTeamSection, but for clarity)
saveOurTeamSection() {
  const data = {
    team: this.detailForm.get('team').value,
  };
  this.saveSectionData(data);
}

// 26. Working Hours Section
saveWorkingHoursSection() {
  const data = {
    mondayShift1_from: this.detailForm.get('mondayShift1_from').value,
    mondayShift1_to: this.detailForm.get('mondayShift1_to').value,
    tuesdayShift1_from: this.detailForm.get('tuesdayShift1_from').value,
    tuesdayShift1_to: this.detailForm.get('tuesdayShift1_to').value,
    wednesdayShift1_from: this.detailForm.get('wednesdayShift1_from').value,
    wednesdayShift1_to: this.detailForm.get('wednesdayShift1_to').value,
    thursdayShift1_from: this.detailForm.get('thursdayShift1_from').value,
    thursdayShift1_to: this.detailForm.get('thursdayShift1_to').value,
    fridayShift1_from: this.detailForm.get('fridayShift1_from').value,
    fridayShift1_to: this.detailForm.get('fridayShift1_to').value,
    saturdayShift1_from: this.detailForm.get('saturdayShift1_from').value,
    saturdayShift1_to: this.detailForm.get('saturdayShift1_to').value,
    sundayShift1_from: this.detailForm.get('sundayShift1_from').value,
    sundayShift1_to: this.detailForm.get('sundayShift1_to').value,
    mondayShift2_from: this.detailForm.get('mondayShift2_from').value,
    mondayShift2_to: this.detailForm.get('mondayShift2_to').value,
    tuesdayShift2_from: this.detailForm.get('tuesdayShift2_from').value,
    tuesdayShift2_to: this.detailForm.get('tuesdayShift2_to').value,
    wednesdayShift2_from: this.detailForm.get('wednesdayShift2_from').value,
    wednesdayShift2_to: this.detailForm.get('wednesdayShift2_to').value,
    thursdayShift2_from: this.detailForm.get('thursdayShift2_from').value,
    thursdayShift2_to: this.detailForm.get('thursdayShift2_to').value,
    fridayShift2_from: this.detailForm.get('fridayShift2_from').value,
    fridayShift2_to: this.detailForm.get('fridayShift2_to').value,
    saturdayShift2_from: this.detailForm.get('saturdayShift2_from').value,
    saturdayShift2_to: this.detailForm.get('saturdayShift2_to').value,
    sundayShift2_from: this.detailForm.get('sundayShift2_from').value,
    sundayShift2_to: this.detailForm.get('sundayShift2_to').value,
  };
  this.saveSectionData(data);
}

// 27. Price Range Section
savePriceRangeSection() {
  const data = {
    price_type: this.detailForm.get('price_type').value,
    price_range_min: this.detailForm.get('price_range_min').value,
    price_range_max: this.detailForm.get('price_range_max').value,
  };
  this.saveSectionData(data);
}

saveSocialLinksSection() {
  const data = {
    facebookLink: this.detailForm.get('facebookLink').value,
    instagramLink: this.detailForm.get('instagramLink').value,
    twitterLink: this.detailForm.get('twitterLink').value,
    pinterestLink: this.detailForm.get('pinterestLink').value,
    linkedInLink: this.detailForm.get('linkedInLink').value,
    youtubeLink: this.detailForm.get('youtubeLink').value,
  };
  this.saveSectionData(data);
}

// Helper to send PUT for section updates
saveSectionData(data: any) {
  // Check if we have a valid listing ID
  // if (!this.pid && !this.listing_id) {
  //   console.error('No listing ID available. Cannot save section data.');
  //   Swal.fire({
  //     position: 'top',
  //     icon: 'error',
  //     title: 'Error: No listing ID found. Please save the full form first.',
  //     showConfirmButton: false,
  //     timer: 3000,
  //   });
  //   return;
  // }

  const listingId = this.pid || this.listing_id;
  console.log('Updating section for listing ID:', listingId);
  console.log('Section data:', data);
  
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'PUT',
      Authorization: 'Bearer ' + this.token,
    }),
  };
  
  this.http
    .put(this.baseurl  + listingId, data, httpOptions)
    .subscribe(
      (res) => {
        console.log('Section data saved successfully:', res);
        this.showSuccess();
      },
      (err) => {
        console.error('Error saving section data:', err);
        this.showError();
      }
    );
}
}
